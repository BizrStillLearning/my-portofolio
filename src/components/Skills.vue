<script setup>
const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Next.js', level: 88 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 87 },
      { name: 'Express', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'REST API', level: 90 },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git', level: 93 },
      { name: 'Figma', level: 88 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 78 },
      { name: 'CI/CD', level: 80 },
    ],
  },
];

const learningTech = ['GraphQL', 'Vue.js', 'Flutter', 'Python', 'AI/ML', 'Web3'];

const sectionScroll = {
  initial: { opacity: 0, y: 50 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 600 }
  }
};
</script>

<template>
  <section
      id="skills"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="py-20 bg-slate-900 relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
          v-motion
          :initial="sectionScroll.initial"
          :visible-once="sectionScroll.visibleOnce"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4">
          Keahlian <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Teknologi dan tools yang saya kuasai untuk menciptakan solusi digital yang powerful
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
            v-for="(cat, catIndex) in skillCategories"
            :key="cat.category"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: catIndex * 200 }
            }"
            class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
        >
          <h3 class="text-2xl font-bold text-purple-400 mb-6">{{ cat.category }}</h3>

          <div class="space-y-4">
            <div v-for="(skill, sIndex) in cat.skills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="text-gray-300 font-medium">{{ skill.name }}</span>
                <span class="text-purple-400">{{ skill.level }}%</span>
              </div>

              <div class="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                    v-motion
                    :initial="{ width: '0%' }"
                    :visible-once="{
                      width: `${skill.level}%`,
                      transition: {
                        duration: 1000,
                        delay: (catIndex * 200) + (sIndex * 100),
                        ease: 'easeOut'
                      }
                    }"
                    class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style="width: 0%"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 800 }
          }"
          class="mt-12 text-center"
      >
        <p class="text-gray-400 mb-6">Selalu belajar teknologi baru dan mengikuti perkembangan industri</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span
              v-for="(tech, tIndex) in learningTech"
              :key="tech"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :visible-once="{
                opacity: 1,
                scale: 1,
                transition: { delay: 900 + (tIndex * 50) }
              }"
              class="px-4 py-2 bg-slate-800 border border-purple-500/20 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 cursor-default"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>