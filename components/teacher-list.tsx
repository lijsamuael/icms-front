"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTeacherStore } from "@/lib/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SubjectList } from "@/components/subject-list"

export function TeacherList() {
  const { teachers, selectedTeacher, setSelectedTeacher } = useTeacherStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTeacherSelect = (teacherId: number) => {
    setSelectedTeacher(teacherId)
    setIsExpanded(true)
  }

  const handleBack = () => {
    setSelectedTeacher(null)
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

  if (isExpanded && selectedTeacher) {
    const teacher = teachers.find((t) => t.id === selectedTeacher)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to all teachers
        </button>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher?.name}`}
                alt={teacher?.name}
              />
              <AvatarFallback>{teacher?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{teacher?.name}</CardTitle>
              <CardDescription>Select a subject to view available lessons</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <SubjectList />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {teachers.map((teacher) => (
        <motion.div key={teacher.id} variants={itemVariants}>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTeacherSelect(teacher.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.name}`}
                  alt={teacher.name}
                />
                <AvatarFallback>{teacher.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{teacher.name}</CardTitle>
                <CardDescription>Click to view subjects</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
