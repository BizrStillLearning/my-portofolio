<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Code2, Palette, Rocket, Users, Milestone, ArrowUpRight } from 'lucide-vue-next';

const { t, tm, rt } = useI18n();

const features = computed(() => {
  const rawFeatures = tm('about.features');
  const icons = [Code2, Palette, Rocket, Users];

  return Array.isArray(rawFeatures) ? rawFeatures.map((feature, index) => ({
    ...feature,
    title: rt(feature.title),
    description: rt(feature.description),
    icon: icons[index] || Code2
  })) : [];
});

const stats = [
  { value: '5+', label: 'about.stats.exp', icon: Milestone },
  { value: '20+', label: 'about.stats.projects', icon: Rocket }
];
</script>

<template>
  <section id="about" class="relative py-28 overflow-hidden bg-slate-50 dark:bg-[#020617]">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,black,transparent)]"></div>

      <svg
          class="absolute inset-0 w-full h-full opacity-[0.45] dark:opacity-[0.3] text-slate-400 dark:text-slate-600"
          style="mask-image: radial-gradient(ellipse 60% 50% at 20% 60%, black, transparent)"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
          fill="none"
      >
        <g stroke="currentColor" stroke-width="1.2" opacity="0.5">
          <path d="M-60 420 C 100 340, 240 500, 180 620 C 130 720, -30 680, -70 590"/>
          <path d="M-60 460 C 90 390, 210 520, 160 615 C 120 690, -10 660, -55 590"/>
          <path d="M-60 500 C 80 440, 185 540, 145 610 C 110 665, 5 645, -40 585"/>
        </g>
        <g fill="currentColor" opacity="0.5">
          <circle cx="240" cy="180" r="2.4"/>
          <circle cx="280" cy="215" r="1.7"/>
          <circle cx="200" cy="220" r="1.5"/>
          <circle cx="1060" cy="240" r="2.2"/>
          <circle cx="1100" cy="280" r="1.6"/>
          <circle cx="950" cy="640" r="2.4"/>
        </g>
        <g stroke="currentColor" stroke-width="1.4" opacity="0.45" stroke-linecap="round">
          <path d="M520 120 v16 M512 128 h16"/>
          <path d="M820 560 v14 M813 567 h14"/>
        </g>
        <g stroke="currentColor" stroke-width="1" opacity="0.3">
          <path d="M560 720 A 80 80 0 0 1 640 665"/>
        </g>
      </svg>

      <div class="absolute inset-0 opacity-[0.35] dark:opacity-[0.5] mix-blend-overlay" style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E&quot;)"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">

      <div v-motion :initial="{ opacity: 0, y: 24 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: [0.22, 1, 0.36, 1] } }" class="mb-16">
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-blue-600/60"></span>
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            {{ t('about.eyebrow', 'About Me') }}
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-2xl">
          {{ t('about.title_part1') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            {{ t('about.title_part2') }}
          </span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-24">
        <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: [0.22, 1, 0.36, 1] } }"
            class="relative group"
        >
          <div class="absolute -inset-0 translate-x-4 translate-y-4 rounded-2xl border border-blue-500/30 dark:border-blue-400/20 transition-transform duration-500 group-hover:translate-x-2.5 group-hover:translate-y-2.5"></div>

          <div class="relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-[4/3] shadow-[0_25px_60px_-20px_rgba(2,6,23,0.35)] dark:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)]">
            <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Developer workspace"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none"></div>
          </div>

        </div>

        <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150, ease: [0.22, 1, 0.36, 1] } }"
        >
          <p class="text-xl md:text-2xl font-semibold leading-relaxed text-slate-900 dark:text-white mb-6">
            {{ t('about.desc_1') }}
          </p>
          <p class="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10">
            {{ t('about.desc_2') }}
          </p>

          <!-- Stats -->
          <div class="flex items-center gap-10 mb-10">
            <div v-for="(stat, sIdx) in stats" :key="sIdx" class="flex items-center gap-3.5">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                <component :is="stat.icon" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">{{ stat.value }}</span>
                <span class="text-xs text-slate-500 dark:text-slate-500">{{ t(stat.label) }}</span>
              </div>
            </div>
          </div>

          <a
              href="https://my-blogger-ivory.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-all duration-200 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5"
          >
            {{ t('about.read_more') }}
            <ArrowUpRight class="w-4 h-4 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 80, ease: [0.22, 1, 0.36, 1] } }"
            class="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.25)] dark:hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        >
          <span class="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>

          <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500">
            <component :is="feature.icon" class="w-5 h-5" />
          </div>
          <h4 class="mb-2 text-base font-bold tracking-tight text-slate-900 dark:text-white">{{ feature.title }}</h4>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>