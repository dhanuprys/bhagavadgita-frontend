import type { MockResponse } from "@/types/chat"

export const mockResponses: MockResponse[] = [
  {
    context: ["Ancient wisdom tradition", "Self-realization teachings", "Dharmic principles"],
    answer: `# Finding Inner Peace

The path to **inner peace** begins with understanding your true nature. Like a lotus that blooms in muddy water yet remains pure, you too can find clarity amidst life's challenges.

## Key Principles:

1. **Mindful awareness** - Observe your thoughts without attachment
2. **Dedicated practice** - Consistency in spiritual discipline
3. **Self-inquiry** - Question the nature of your true Self

> *"You have the right to perform your actions, but you are not entitled to the fruits of action."* - Bhagavad Gita 2.47

Remember, peace is not the absence of conflict, but the ability to remain centered within it.`,
    quickReplies: ["How do I start meditating?", "Tell me about dharma", "What is self-realization?"],
    delay: 2000,
  },
  {
    context: ["Karma yoga principles", "Detached action", "Service without attachment"],
    answer: `# The Path of Karma Yoga

**True fulfillment** comes not from the fruits of action, but from the purity of intention behind your deeds. When you act without attachment to results, you transform ordinary work into spiritual practice.

## Understanding Karma Yoga:

- **Selfless service** - Acting for the benefit of all beings
- **Detached engagement** - Performing duties without ego involvement  
- **Offering to the Divine** - Dedicating all actions as worship

### Practical Steps:

1. Begin each day with intention setting
2. Perform your duties with full attention
3. Release attachment to outcomes
4. See all work as service to the greater good

*The key is not in what you do, but in how you do it.*`,
    quickReplies: ["How to practice karma yoga?", "What is detachment?", "Examples of selfless service"],
    delay: 1800,
  },
  {
    context: ["Meditation practices", "Mind control techniques", "Inner stillness"],
    answer: `# Mastering the Mind

The mind is like a **restless monkey**, jumping from thought to thought. Through gentle discipline and consistent practice, you can train it to find stillness.

## Meditation Fundamentals:

### Preparation:
- Find a quiet, comfortable space
- Sit with spine erect but relaxed
- Set aside 10-20 minutes daily

### Practice:
1. **Focus on breath** - Natural rhythm, no forcing
2. **Observe thoughts** - Let them pass like clouds
3. **Return to center** - Gently bring attention back

### Benefits:
- Reduced mental chatter
- Increased clarity and focus
- Greater emotional stability
- Connection to inner peace

> *"When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place."* - Bhagavad Gita 6.19

Start small, be consistent, and be patient with yourself.`,
    quickReplies: ["Meditation techniques", "How to calm the mind?", "Daily practice tips"],
    delay: 2200,
  },
  {
    context: ["Life purpose", "Dharmic duty", "Personal growth"],
    answer: `# Discovering Your Dharma

Your **purpose** unfolds naturally when you align with your true nature. Like a river flowing toward the ocean, when you follow your dharma with dedication and compassion, you contribute to the greater harmony of existence.

## Understanding Dharma:

**Dharma** has multiple meanings:
- Your righteous duty in life
- The natural order of the universe  
- Your unique contribution to the world

### Finding Your Path:

1. **Self-reflection** - What brings you joy and energy?
2. **Service orientation** - How can you help others?
3. **Natural talents** - What are your innate gifts?
4. **Life circumstances** - What opportunities present themselves?

### Living Dharma:

- Act according to your conscience
- Consider the welfare of all beings
- Balance personal growth with service
- Trust the unfolding process

*Your dharma is not just what you do, but who you become in the process.*`,
    quickReplies: ["How to find my purpose?", "What is dharma?", "Overcoming life challenges"],
    delay: 1900,
  },
  {
    context: ["Emotional balance", "Inner strength", "Spiritual resilience"],
    answer: `# Cultivating Emotional Balance

**Emotions** are like clouds passing through the sky of consciousness. By observing them without attachment, you develop the wisdom to respond rather than react.

## The Nature of Emotions:

Emotions are:
- **Temporary** - They arise and pass away
- **Informative** - They provide valuable feedback
- **Transformable** - They can be channeled constructively

## Building Inner Strength:

### Daily Practices:
1. **Witness consciousness** - Observe emotions without identifying with them
2. **Breathing techniques** - Use breath to regulate emotional states
3. **Gratitude practice** - Focus on what you appreciate
4. **Self-compassion** - Treat yourself with kindness

### In Difficult Moments:
- **Pause** before reacting
- **Breathe** deeply and slowly
- **Ask** "What is this emotion teaching me?"
- **Choose** your response consciously

> *"You have power over your mind - not outside events. Realize this, and you will find strength."* - Marcus Aurelius

Remember, true strength lies not in avoiding difficulties, but in maintaining your center through them.`,
    quickReplies: ["Managing difficult emotions", "Building inner strength", "Staying centered"],
    delay: 2100,
  },
]

export function getRandomResponse(): MockResponse {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)]
}

export const welcomeQuickReplies = [
  "Apa arti hidup?",
  "Bagaimana saya bisa menemukan kedamaian batin?",
  "Sloka tentang karma",
  "Bagaimana cara mengatasi penderitaan?",
  "Bagaimana keserakahan mempengaruhi manusia?"
]
