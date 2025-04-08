"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTeacherStore } from "@/lib/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LessonList } from "@/components/lesson-list"
import { Book } from "lucide-react"

export function SubjectList() {
  const { subjects, selectedSubject, setSelectedSubject } = useTeacherStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubjectSelect = (subjectId: number) => {
    setSelectedSubject(subjectId)
    setIsExpanded(true)
  }

  const handleBack = () => {
    setSelectedSubject(null)
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

  if (isExpanded && selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to all subjects
        </button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Book className="h-5 w-5" />
              {subject?.name}
            </CardTitle>
            <CardDescription>Available lessons for this subject</CardDescription>
          </CardHeader>
        </Card>

        <LessonList />
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
      {subjects.map((subject) => (
        <motion.div key={subject.id} variants={itemVariants}>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSubjectSelect(subject.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                {subject.name}
              </CardTitle>
              <CardDescription>Click to view lessons</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
