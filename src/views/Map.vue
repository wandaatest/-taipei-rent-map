<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import maplibregl, { type Map as MapLibreMap, type Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapPopup from '@/components/MapPopup.vue';
import { neighborhoods } from '@/utils/recommendation';

const activeId = ref(neighborhoods[0]?.id ?? '');
const popupOpen = ref(true);
const popupExpanded = ref(false);
const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<MapLibreMap | null>(null);
const markers = new Map<string, Marker>();

const CARTO_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const activeNeighborhood = computed(
  () => neighborhoods.find((neighborhood) => neighborhood.id === activeId.value) ?? neighborhoods[0],
);

function markerHtml(neighborhoodId: string, accent: string) {
  return `
    <button
      type="button"
      class="map-pin ${activeId.value === neighborhoodId ? 'is-active' : ''}"
      data-id="${neighborhoodId}"
      aria-label="Select neighborhood ${neighborhoodId}"
      style="--pin-accent: ${accent};"
    >
      <span class="map-pin__dot"></span>
    </button>
  `;
}

function updateMarkers() {
  neighborhoods.forEach((neighborhood) => {
    const marker = markers.get(neighborhood.id);
    const element = marker?.getElement();

    if (!element) {
      return;
    }

    element.innerHTML = markerHtml(neighborhood.id, neighborhood.accent);
    const button = element.querySelector<HTMLButtonElement>('button[data-id]');

    if (!button) {
      return;
    }

    button.addEventListener('click', () => {
      selectNeighborhood(neighborhood.id);
    });
  });
}

function mountMap() {
  if (!mapContainer.value || map.value) {
    return;
  }

  const instance = new maplibregl.Map({
    container: mapContainer.value,
    style: CARTO_STYLE_URL,
    center: [121.5435, 25.0418],
    zoom: 11.2,
    attributionControl: false,
  });

  instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
  instance.addControl(
    new maplibregl.AttributionControl({
      compact: true,
      customAttribution: 'Taipei Her Map · © CARTO · © OpenStreetMap contributors',
    }),
    'bottom-left',
  );

  neighborhoods.forEach((neighborhood) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'map-pin-wrapper';
    markerElement.innerHTML = markerHtml(neighborhood.id, neighborhood.accent);

    const button = markerElement.querySelector<HTMLButtonElement>('button[data-id]');
    button?.addEventListener('click', () => {
      selectNeighborhood(neighborhood.id);
    });

    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: 'center',
    })
      .setLngLat([neighborhood.location.lng, neighborhood.location.lat])
      .addTo(instance);

    markers.set(neighborhood.id, marker);
  });

  map.value = instance;
}

function focusNeighborhood() {
  const neighborhood = activeNeighborhood.value;

  map.value?.flyTo({
    center: [neighborhood.location.lng, neighborhood.location.lat],
    zoom: 13.4,
    essential: true,
  });

  updateMarkers();
}

function selectNeighborhood(neighborhoodId: string) {
  activeId.value = neighborhoodId as typeof activeId.value;
  popupOpen.value = true;
  popupExpanded.value = false;
  focusNeighborhood();
}

onMounted(() => {
  mountMap();
});

watch(activeId, () => {
  updateMarkers();
});

onBeforeUnmount(() => {
  markers.forEach((marker) => marker.remove());
  markers.clear();
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <section class="w-full">
    <div>
      <div class="editorial-card relative overflow-hidden">
        <div ref="mapContainer" class="map-frame relative min-h-[76vh] w-full lg:min-h-[84vh] xl:min-h-[calc(100vh-180px)]" />

        <div class="pointer-events-none absolute inset-x-0 top-4 z-20 px-4 sm:px-6">
          <div class="pointer-events-auto w-full">
            <div class="inline-grid w-full overflow-hidden border border-white/60 bg-white/80 shadow-editorial backdrop-blur md:grid-cols-3 lg:grid-cols-6">
              <button
                v-for="neighborhood in neighborhoods"
                :key="`header-${neighborhood.id}`"
                class="flex min-w-0 flex-col items-start gap-2 border-r border-rosewood/8 px-4 py-3 text-left transition last:border-r-0"
                :class="
                  activeId === neighborhood.id
                    ? 'bg-white/92 text-rosewood/88 shadow-[inset_0_-2px_0_0_rgba(158,120,109,0.52)]'
                    : 'bg-transparent text-ink/70 hover:bg-white/70 hover:text-rosewood/78 hover:shadow-[inset_0_-2px_0_0_rgba(158,120,109,0.18)]'
                "
                @click="selectNeighborhood(neighborhood.id)"
              >
                <span class="flex min-w-0 items-start gap-2">
                  <span class="mt-[0.42rem] h-2 w-2 shrink-0 opacity-70" :style="{ backgroundColor: neighborhood.accent }" />
                  <span class="min-w-0">
                    <strong class="block text-[13px] font-medium leading-5 tracking-[0.04em]">{{ neighborhood.shortName }}</strong>
                    <span class="block text-[11px] leading-4 text-ink/42">{{ neighborhood.location.landmark }}</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="popupOpen"
          class="pointer-events-none absolute bottom-6 right-6 z-20 hidden max-h-[calc(100%-7rem)] w-[420px] xl:block"
        >
          <div class="pointer-events-auto relative">
            <button
              class="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-rosewood/10 bg-white/90 text-ink/55 transition hover:text-rosewood"
              @click="popupOpen = false"
            >
              ×
            </button>
            <MapPopup
              class="max-h-[calc(100vh-240px)] overflow-y-auto"
              :neighborhood="activeNeighborhood"
              :expanded="popupExpanded"
              @toggle="popupExpanded = !popupExpanded"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="popupOpen" class="mt-6 xl:hidden">
      <div class="relative">
        <button
          class="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-rosewood/10 bg-white/90 text-ink/55 transition hover:text-rosewood"
          @click="popupOpen = false"
        >
          ×
        </button>
        <MapPopup
          :neighborhood="activeNeighborhood"
          :expanded="popupExpanded"
          @toggle="popupExpanded = !popupExpanded"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.maplibregl-ctrl-bottom-right) {
  right: 16px;
  bottom: 52px;
}

:deep(.maplibregl-ctrl-bottom-left) {
  left: 16px;
  bottom: 12px;
}

:deep(.maplibregl-ctrl-group) {
  border: 1px solid rgba(126, 84, 72, 0.12);
  border-radius: 0;
  box-shadow: 0 18px 50px rgba(78, 53, 42, 0.12);
}

:deep(.maplibregl-ctrl-group button) {
  width: 34px;
  height: 34px;
}

:deep(.maplibregl-ctrl-attrib) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(126, 84, 72, 0.12);
  border-radius: 0;
  color: rgba(31, 26, 23, 0.72);
  margin: 0;
}

:deep(.maplibregl-ctrl-attrib a) {
  color: rgba(126, 84, 72, 1);
}

.map-frame {
  position: relative;
}

:deep(.maplibregl-canvas) {
  filter: saturate(0.82) contrast(0.98) brightness(1.01);
}

:deep(.map-pin) {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.96);
  background: var(--pin-accent);
  box-shadow: 0 12px 28px rgba(78, 53, 42, 0.18);
  cursor: pointer;
}

:deep(.map-pin:hover),
:deep(.map-pin.is-active) {
  transform: scale(1.12);
}

:deep(.map-pin__dot) {
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.96);
}
</style>
