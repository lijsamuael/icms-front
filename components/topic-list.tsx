"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useIslamicKnowledgeStore } from "@/lib/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClassList } from "@/components/class-list"
import { BookOpen, Bookmark } from "lucide-react"

export function TopicList() {
  const { topics, selectedTopic, setSelectedTopic } = useIslamicKnowledgeStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTopicSelect = (topicId: number) => {
    setSelectedTopic(topicId)
    setIsExpanded(true)
  }

  const handleBack = () => {
    setSelectedTopic(null)
    setIsExpanded(false)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (isExpanded && selectedTopic) {
    const topic = topics.find((t) => t.id === selectedTopic)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800"
        >
          ← Back to all topics
        </button>

        <Card className="mb-8 border-emerald-100 dark:border-emerald-900">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              {topic?.name}
            </CardTitle>
            <CardDescription>Available classes for this topic</CardDescription>
          </CardHeader>
        </Card>

        <ClassList />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {topics.map((topic) => (
        <motion.div key={topic.id} variants={itemVariants}>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-emerald-100 dark:border-emerald-900 overflow-hidden"
            onClick={() => handleTopicSelect(topic.id)}
          >
            <div className="h-1 bg-emerald-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-emerald-600" />
                {topic.name}
              </CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
