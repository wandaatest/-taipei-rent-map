<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import maplibregl, { type Map as MapLibreMap, type Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapPopup from '@/components/MapPopup.vue';
import { neighborhoods } from '@/utils/recommendation';

const activeId = ref(neighborhoods[0]?.id ?? '');
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
      activeId.value = neighborhood.id;
      map.value?.flyTo({
        center: [neighborhood.location.lng, neighborhood.location.lat],
        zoom: 13.4,
        essential: true,
      });
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

  instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  instance.addControl(
    new maplibregl.AttributionControl({
      compact: true,
      customAttribution: 'Taipei Her Map · © CARTO · © OpenStreetMap contributors',
    }),
    'bottom-right',
  );

  neighborhoods.forEach((neighborhood) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'map-pin-wrapper';
    markerElement.innerHTML = markerHtml(neighborhood.id, neighborhood.accent);

    const button = markerElement.querySelector<HTMLButtonElement>('button[data-id]');
    button?.addEventListener('click', () => {
      activeId.value = neighborhood.id;
      instance.flyTo({
        center: [neighborhood.location.lng, neighborhood.location.lat],
        zoom: 13.4,
        essential: true,
      });
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
  <section>
    <div class="mb-8 max-w-3xl">
      <p class="section-label">Rent Map</p>
      <h1 class="font-display text-5xl text-ink">台北女子圖鑑租金地圖</h1>
      <p class="mt-5 text-lg leading-8 text-ink/68">
        第一版改成真地圖底圖，先用免費的 OpenStreetMap 系圖層與代表點位，之後再替換成你實拍街區與正式地址。
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="editorial-card overflow-hidden">
        <div class="flex items-center justify-between border-b border-rosewood/10 px-5 py-4">
          <div>
            <p class="text-xs uppercase tracking-[0.22em] text-rosewood/60">Map Layer</p>
            <p class="mt-1 text-sm text-ink/70">CARTO Positron</p>
          </div>
          <span class="editorial-chip">Free Basemap</span>
        </div>

        <div ref="mapContainer" class="map-frame relative min-h-[560px] w-full" />
      </div>

      <div class="flex flex-col gap-4">
        <MapPopup :neighborhood="activeNeighborhood" />

        <div class="editorial-card p-6">
          <p class="mb-4 text-xs uppercase tracking-[0.22em] text-rosewood/60">Area List</p>
          <div class="grid gap-3">
            <button
              v-for="neighborhood in neighborhoods"
              :key="`list-${neighborhood.id}`"
              class="flex items-center justify-between border px-4 py-3 text-left transition"
              :class="
                activeId === neighborhood.id
                  ? 'border-rosewood bg-blush/70 shadow-[inset_3px_0_0_0_rgba(126,84,72,1)]'
                  : 'border-rosewood/10 bg-white/70 hover:border-rosewood/40'
              "
              @click="
                activeId = neighborhood.id;
                focusNeighborhood();
              "
            >
              <span>
                <strong class="block text-sm text-ink">{{ neighborhood.name }}</strong>
                <span class="text-xs text-ink/55">{{ neighborhood.location.landmark }}</span>
              </span>
              <span class="h-3 w-3" :style="{ backgroundColor: neighborhood.accent }" />
            </button>
          </div>
        </div>

        <div class="editorial-card p-6">
          <p class="mb-3 text-xs uppercase tracking-[0.22em] text-rosewood/60">Map Note</p>
          <p class="text-sm leading-7 text-ink/68">
            底圖改為公開可用的 CARTO Positron，較適合 GitHub Pages 這種純靜態部署。之後你把每區正式街區與照片給我，我就能把這頁改成完整生活圈地圖。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.maplibregl-ctrl-top-right) {
  top: 16px;
  right: 16px;
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
  margin: 0 12px 12px 0;
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
