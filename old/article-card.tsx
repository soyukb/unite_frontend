import Image from "next/image"

export default function ArticleCard() {
  return (
    <article className="max-w-4xl mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-8">
        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
            In New Mexico, a Democratic Governor Wants to Get Tough on Crime
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Gov. Michelle Lujan Grisham has clashed with her own party over how to tackle the nexus of addiction, mental illness and violence in New Mexico.
          </p>
          <div className="text-sm text-gray-500 font-medium">
            7 MIN READ
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Article featured image"
            width={800}
            height={600}
            className="w-full rounded-lg object-cover"
          />
          <div className="text-xs text-gray-500 mt-2">
            Justin Hamel for The New York Times
          </div>
        </div>
      </div>
    </article>
  )
}

