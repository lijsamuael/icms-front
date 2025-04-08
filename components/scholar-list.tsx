"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useIslamicKnowledgeStore } from "@/lib/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TopicList } from "@/components/topic-list"
import { Badge } from "@/components/ui/badge"

export function ScholarList() {
  const { scholars, selectedScholar, setSelectedScholar } = useIslamicKnowledgeStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleScholarSelect = (scholarId: number) => {
    setSelectedScholar(scholarId)
    setIsExpanded(true)
  }

  const handleBack = () => {
    setSelectedScholar(null)
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

  if (isExpanded && selectedScholar) {
    const scholar = scholars.find((s) => s.id === selectedScholar)

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800"
        >
          ← Back to all scholars
        </button>

        <Card className="mb-8 border-emerald-100 dark:border-emerald-900">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-emerald-100 dark:border-emerald-800">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scholar?.name}`}
                alt={scholar?.name}
              />
              <AvatarFallback className="bg-emerald-100 text-emerald-800">
                {scholar?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{scholar?.name}</CardTitle>
              <CardDescription className="mt-1">{scholar?.specialty}</CardDescription>
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                >
                  {scholar?.location}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <TopicList />
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
      {scholars.map((scholar) => (
        <motion.div key={scholar.id} variants={itemVariants}>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-emerald-100 dark:border-emerald-900 overflow-hidden"
            onClick={() => handleScholarSelect(scholar.id)}
          >
            <div className="h-2 bg-emerald-600"></div>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="border-2 border-emerald-100 dark:border-emerald-800">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scholar.name}`}
                  alt={scholar.name}
                />
                <AvatarFallback className="bg-emerald-100 text-emerald-800">
                  {scholar.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{scholar.name}</CardTitle>
                <CardDescription className="mt-1">{scholar.specialty}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
