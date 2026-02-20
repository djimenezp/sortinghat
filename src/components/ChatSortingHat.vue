<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-0">
      <!-- Scrollable chat viewport -->
      <div
          ref="scrollBox"
          class="p-3"
          style="height: min(72vh, 760px); overflow: auto;"
      >
        <TransitionGroup name="msg" tag="div" class="d-flex flex-column gap-2">
          <ChatMessage
              v-for="m in messages"
              :key="m.id"
              :from="m.from"
              :kind="m.kind"
              :text="m.text"
          >
            <template v-if="m.kind === 'choices'" #choices>
              <AnswerChoices
                  :choices="m.choices"
                  :disabled="m.disabled"
                  @pick="answerQuestion"
              />
            </template>
          </ChatMessage>
        </TransitionGroup>
      </div>

      <!-- Composer (only for name input, then hidden) -->
      <div class="border-top p-3 bg-white">
        <div v-if="state.phase === 'ASK_NAME'" class="d-flex gap-2">
          <input
              v-model="nameDraft"
              class="form-control"
              placeholder="Type your name…"
              @keyup.enter="submitName(nameDraft)"
          />
          <button class="btn btn-dark" @click="submitName(nameDraft)">Send</button>
        </div>

        <div v-else class="d-flex justify-content-end">
          <button v-if="canRestart" class="btn btn-outline-dark" @click="restart">
            Restart
          </button>
          <span v-else class="text-secondary small">Pick an option above 👆</span>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {computed, nextTick, onMounted, reactive, ref} from 'vue'
import questionsRaw from '@/assets/questions.json'
import ChatMessage from './ChatMessage.vue'
import AnswerChoices from './AnswerChoices.vue'
import {applyScores, createInitialScores, houseMeta, pickHouse} from '@/logic/sortingHatEngine'

const messages = ref([])
const scrollBox = ref(null)

const state = reactive({
  phase: 'ASK_NAME', // ASK_NAME | QUIZ | RESULT
  name: '',
  qIndex: 0,
  scores: createInitialScores(),
  resultHouse: null,
})

const questions = computed(() => Array.isArray(questionsRaw) ? questionsRaw : [])

function pushMessage(msg) {
  messages.value.push({id: crypto.randomUUID(), ...msg})
}

async function scrollToBottom() {
  await nextTick()
  const el = scrollBox.value
  if (!el) return
  el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})
}

function bot(text) {
  pushMessage({from: 'bot', kind: 'text', text})
  scrollToBottom()
}

function user(text) {
  pushMessage({from: 'user', kind: 'text', text})
  scrollToBottom()
}

function botChoices(prompt, choices) {
  pushMessage({from: 'bot', kind: 'choices', text: prompt, choices})
  scrollToBottom()
}

function clearPendingChoices() {
  // Remove any still-clickable choices messages (optional strictness)
  messages.value = messages.value.map(m => (m.kind === 'choices' ? {...m, disabled: true} : m))
}

function start() {
  bot("Hello, young wizard. I am the Sorting Hat. 🧙‍♂️")
  bot("First things first... what’s your name?")
}

function submitName(name) {
  const n = (name ?? '').trim()
  if (!n) return
  state.name = n
  user(n)
  bot(`Nice to meet you, ${n}.`)
  state.phase = 'QUIZ'
  askCurrentQuestion()
}

function askCurrentQuestion() {
  const q = questions.value[state.qIndex]
  if (!q) return finalize()
  const answers = Array.isArray(q.answers) ? q.answers : []
  botChoices(q.title, answers.map((a, idx) => ({
    key: String(idx),
    title: a.title,
    scores: a.scores,
  })))
}

function answerQuestion(choice) {
  clearPendingChoices()
  user(choice.title)

  applyScores(state.scores, choice.scores)

  state.qIndex += 1
  if (state.qIndex < questions.value.length) {
    askCurrentQuestion()
  } else {
    finalize()
  }
}

function finalize() {
  state.phase = 'RESULT'
  const houseKey = pickHouse(state.scores)
  state.resultHouse = houseMeta(houseKey)

  bot("That’s all. The Hat has made its decision...")
  bot(`🪄 **${state.resultHouse.name}**!`)
  bot(`Because: ${state.resultHouse.vibe}.`)
  bot(`Final scores: G=${state.scores.G}, H=${state.scores.H}, R=${state.scores.R}, S=${state.scores.S}`)
}

const canRestart = computed(() => state.phase === 'RESULT')

function restart() {
  messages.value = []
  state.phase = 'ASK_NAME'
  state.name = ''
  state.qIndex = 0
  state.scores = createInitialScores()
  state.resultHouse = null
  start()
}

const nameDraft = ref('')

onMounted(() => {
  start()
})
</script>