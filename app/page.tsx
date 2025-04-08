import { ScholarList } from "@/components/scholar-list"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Discover Islamic Knowledge</h1>
      <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
        Connect with respected scholars and explore various Islamic topics through structured classes and lessons.
      </p>
      <ScholarList />
    </main>
  )
}
