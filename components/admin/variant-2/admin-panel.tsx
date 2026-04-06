"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useSiteContent } from "@/components/site-content-provider"
import type { Category, Product, SiteContent } from "@/lib/types"

const adminSections = [
  { id: "catalog", label: "Каталог" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "О нас" },
  { id: "production", label: "Производство" },
  { id: "visit", label: "Поле" },
  { id: "contacts", label: "Контакты" },
] as const

type AdminSection = (typeof adminSections)[number]["id"]

function createCategory(): Category {
  return {
    id: crypto.randomUUID(),
    label: "Новая категория",
    icon: "✦",
  }
}

function createProduct(categoryId: string): Product {
  return {
    id: crypto.randomUUID(),
    slug: "",
    name: "",
    category: categoryId,
    price: 0,
    image: "",
    description: "",
    badge: "",
    badgeColor: "bg-[#9B6DD4]",
    featured: false,
  }
}

function SectionButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
        active ? "bg-[#8b9a7d] text-white shadow-sm" : "bg-white text-[#6f6254] hover:bg-[#f2ece2]"
      }`}
    >
      {label}
    </button>
  )
}

export function AdminPanelV2() {
  const { content, setContent, saveContent, isLoading, isSaving, isDirty, saveError } = useSiteContent()
  const [activeSection, setActiveSection] = useState<AdminSection>("catalog")
  const [selectedCategoryId, setSelectedCategoryId] = useState(content.categories[1]?.id ?? content.categories[0]?.id ?? "")
  const [selectedProductId, setSelectedProductId] = useState(content.products[0]?.id ?? "")
  const [search, setSearch] = useState("")

  const categories = content.categories.filter((category) => category.id !== "all")

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return content.products.filter((product) => {
      const inCategory = !selectedCategoryId || product.category === selectedCategoryId
      const inQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.badge?.toLowerCase().includes(query)

      return inCategory && inQuery
    })
  }, [content.products, search, selectedCategoryId])

  const selectedProduct = content.products.find((product) => product.id === selectedProductId) ?? null

  useEffect(() => {
    if (!selectedCategoryId && categories[0]?.id) {
      setSelectedCategoryId(categories[0].id)
    }

    if (!selectedProductId && content.products[0]?.id) {
      setSelectedProductId(content.products[0].id)
    }
  }, [categories, content.products, selectedCategoryId, selectedProductId])

  const stats = [
    { label: "Категорий", value: categories.length },
    { label: "Товаров", value: content.products.length },
    { label: "Изображений", value: 1 + content.about.gallery.length + 1 + content.visit.gallery.length },
  ]

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    setContent((current) => updater(current))
  }

  const updateCategory = (id: string, patch: Partial<Category>) => {
    updateContent((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === id ? { ...category, ...patch } : category,
      ),
    }))
  }

  const addCategory = () => {
    const category = createCategory()
    updateContent((current) => ({
      ...current,
      categories: [...current.categories, category],
    }))
    setSelectedCategoryId(category.id)
  }

  const deleteCategory = (id: string) => {
    const nextCategories = content.categories.filter((category) => category.id !== id)
    const nextProducts = content.products.filter((product) => product.category !== id)

    updateContent((current) => ({
      ...current,
      categories: nextCategories,
      products: nextProducts,
    }))
    setSelectedCategoryId(nextCategories[1]?.id ?? "")
    setSelectedProductId(nextProducts[0]?.id ?? "")
  }

  const updateProduct = (id: string, patch: Partial<Product>) => {
    updateContent((current) => ({
      ...current,
      products: current.products.map((product) =>
        product.id === id ? { ...product, ...patch } : product,
      ),
    }))
  }

  const addProduct = () => {
    const categoryId = selectedCategoryId || categories[0]?.id || "all"
    const product = createProduct(categoryId)

    updateContent((current) => ({
      ...current,
      products: [product, ...current.products],
    }))
    setSelectedProductId(product.id)
  }

  const deleteProduct = (id: string) => {
    const nextProducts = content.products.filter((product) => product.id !== id)

    updateContent((current) => ({
      ...current,
      products: nextProducts,
    }))
    setSelectedProductId(nextProducts[0]?.id ?? "")
  }

  const handleSave = async () => {
    await saveContent()
  }

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-[#3c3027]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-3 rounded-[1.75rem] border border-[#e0d2bd] bg-[#fcfaf7] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#3c3027]">
              {isLoading ? "Загружаем данные сайта..." : isDirty ? "Есть несохраненные изменения" : "Все изменения сохранены"}
            </p>
            <p className="mt-1 text-sm text-[#8f7c6a]">
              Контент хранится на сервере. После сохранения обновления сразу доступны на публичном сайте.
            </p>
            {saveError ? <p className="mt-2 text-sm text-red-600">{saveError}</p> : null}
          </div>
          <Button onClick={handleSave} disabled={isLoading || isSaving || !isDirty} className="bg-[#6B4C9A] hover:bg-[#5e4288]">
            {isSaving ? "Сохраняем..." : "Сохранить изменения"}
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[300px,1fr]">
          <aside className="space-y-6">
            <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Полное управление сайтом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-[#766657]">
                <p>Здесь можно менять категории, товары, бейджи, все основные изображения и тексты секций.</p>
                <p>Изменения сохраняются на сервере и после публикации сразу влияют на публичный сайт.</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                  <CardContent className="flex min-h-24 flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#9b8a7a]">{stat.label}</p>
                    <p className="mt-2 font-serif text-3xl">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Разделы</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {adminSections.map((section) => (
                  <SectionButton
                    key={section.id}
                    active={activeSection === section.id}
                    label={section.label}
                    onClick={() => setActiveSection(section.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            {activeSection === "catalog" ? (
              <>
                <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <CardTitle className="font-serif text-2xl">Категории товаров</CardTitle>
                    <Button onClick={addCategory} className="bg-[#8b9a7d] hover:bg-[#77876a]">
                      Добавить категорию
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`rounded-3xl border p-4 ${selectedCategoryId === category.id ? "border-[#8b9a7d] bg-[#f3ede4]" : "border-[#eadfce] bg-white"}`}
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <button
                            onClick={() => setSelectedCategoryId(category.id)}
                            className="text-left font-medium text-[#3c3027]"
                          >
                            {category.label}
                          </button>
                          <Button variant="outline" size="sm" onClick={() => deleteCategory(category.id)}>
                            Удалить
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[96px,1fr]">
                          <div>
                            <Label>Иконка</Label>
                            <Input
                              value={category.icon}
                              onChange={(event) => updateCategory(category.id, { icon: event.target.value })}
                              className="mt-2 h-12 border-[#e0d2bd] bg-white text-center text-xl"
                            />
                          </div>
                          <div>
                            <Label>Название</Label>
                            <Input
                              value={category.label}
                              onChange={(event) => updateCategory(category.id, { label: event.target.value })}
                              className="mt-2 h-12 border-[#e0d2bd] bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <CardTitle className="font-serif text-2xl">Товары</CardTitle>
                      <p className="mt-1 text-sm text-[#8f7c6a]">Создавай товары внутри выбранной категории и управляй их бейджами.</p>
                    </div>
                    <Button onClick={addProduct} className="bg-[#8b9a7d] hover:bg-[#77876a]">
                      Добавить товар
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-6 lg:grid-cols-[360px,1fr]">
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-[#eadfce] bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b8a7a]">Текущая категория</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => setSelectedCategoryId(category.id)}
                              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                selectedCategoryId === category.id
                                  ? "bg-[#8b9a7d] text-white shadow-sm"
                                  : "bg-[#f4ede6] text-[#6f6254] hover:bg-[#eadfce]"
                              }`}
                            >
                              <span>{category.icon}</span>
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Поиск внутри категории"
                        className="h-12 border-[#e0d2bd] bg-white"
                      />
                      <div className="rounded-3xl border border-[#eadfce] bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b8a7a]">Ассортимент категории</p>
                            <p className="mt-1 text-sm text-[#8f7c6a]">
                              {categories.find((category) => category.id === selectedCategoryId)?.label ?? "Категория не выбрана"}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#f4ede6] px-3 py-1 text-xs font-medium text-[#6f6254]">
                            {filteredProducts.length} шт
                          </span>
                        </div>

                        <div className="space-y-3">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                              <div
                                key={product.id}
                                className={`rounded-2xl border p-3 transition-all ${
                                  selectedProductId === product.id ? "border-[#8b9a7d] bg-[#f2ece2]" : "border-[#ede1d0] bg-[#fcfaf7]"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedProductId(product.id)}
                                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                                  >
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f2ece2]">
                                      {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : null}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-start justify-between gap-3">
                                        <p className="truncate font-medium text-[#3c3027]">{product.name || "Новый товар"}</p>
                                        <span className="shrink-0 text-sm font-semibold text-[#8b9a7d]">{product.price} BYN</span>
                                      </div>
                                      <p className="mt-1 line-clamp-2 text-sm text-[#8f7c6a]">{product.description || "Без описания"}</p>
                                    </div>
                                  </button>
                                  <div className="flex flex-col gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setSelectedProductId(product.id)}>
                                      Изменить
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                                      Удалить
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-2xl border border-dashed border-[#dccdb8] bg-[#fcfaf7] px-4 py-6 text-sm text-[#8f7c6a]">
                              В этой категории пока нет товаров. Нажми `Добавить товар`, чтобы создать первый.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedProduct ? (
                      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr),280px]">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-serif text-2xl">Редактор товара</h3>
                            <Button variant="outline" onClick={() => deleteProduct(selectedProduct.id)}>
                              Удалить товар
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Название</Label>
                              <Input value={selectedProduct.name} onChange={(event) => updateProduct(selectedProduct.id, { name: event.target.value })} className="mt-2 h-12 border-[#e0d2bd] bg-white" />
                            </div>
                            <div>
                              <Label>Slug</Label>
                              <Input value={selectedProduct.slug} onChange={(event) => updateProduct(selectedProduct.id, { slug: event.target.value })} className="mt-2 h-12 border-[#e0d2bd] bg-white" />
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Категория</Label>
                              <select
                                value={selectedProduct.category}
                                onChange={(event) => updateProduct(selectedProduct.id, { category: event.target.value })}
                                className="mt-2 h-12 w-full rounded-xl border border-[#e0d2bd] bg-white px-4"
                              >
                                {categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label>Цена</Label>
                              <Input type="number" value={selectedProduct.price} onChange={(event) => updateProduct(selectedProduct.id, { price: Number(event.target.value) })} className="mt-2 h-12 border-[#e0d2bd] bg-white" />
                            </div>
                          </div>
                          <div>
                            <ImageField label="Изображение товара" value={selectedProduct.image} onChange={(value) => updateProduct(selectedProduct.id, { image: value })} />
                          </div>
                          <div>
                            <Label>Описание</Label>
                            <Textarea rows={5} value={selectedProduct.description} onChange={(event) => updateProduct(selectedProduct.id, { description: event.target.value })} className="mt-2 min-h-32 border-[#e0d2bd] bg-white" />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Плашка</Label>
                              <Input value={selectedProduct.badge ?? ""} onChange={(event) => updateProduct(selectedProduct.id, { badge: event.target.value })} placeholder="Популярное / Скидка" className="mt-2 h-12 border-[#e0d2bd] bg-white" />
                            </div>
                            <div>
                              <Label>Цвет плашки</Label>
                              <Input value={selectedProduct.badgeColor ?? ""} onChange={(event) => updateProduct(selectedProduct.id, { badgeColor: event.target.value })} placeholder="bg-[#9B6DD4]" className="mt-2 h-12 border-[#e0d2bd] bg-white" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 rounded-3xl border border-[#e7d9c5] bg-white p-4 lg:sticky lg:top-24">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b8a7a]">Как выглядит карточка</p>
                          <div className="rounded-2xl border border-[#eee4d7] bg-[#fcfaf7] p-3">
                            <div className="flex items-start gap-3">
                              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f2ece2]">
                                {selectedProduct.image ? <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" /> : null}
                              </div>
                              <div className="min-w-0 flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <Badge variant="outline" className="max-w-full truncate">
                                    {categories.find((category) => category.id === selectedProduct.category)?.label ?? "Без категории"}
                                  </Badge>
                                  <span className="shrink-0 font-semibold text-[#8b9a7d]">{selectedProduct.price} BYN</span>
                                </div>
                                <h4 className="line-clamp-2 font-serif text-xl leading-tight">{selectedProduct.name || "Новый товар"}</h4>
                                <p className="line-clamp-3 text-sm leading-relaxed text-[#766657]">
                                  {selectedProduct.description || "Описание товара появится здесь."}
                                </p>
                              </div>
                            </div>
                            {selectedProduct.badge ? <Badge className={`mt-3 ${selectedProduct.badgeColor}`}>{selectedProduct.badge}</Badge> : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </>
            ) : null}

            {activeSection === "hero" ? (
              <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Hero секция</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <Field label="Плашка" value={content.hero.badge} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, badge: value } }))} />
                  <Field label="Заголовок до акцента" value={content.hero.titlePrefix} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, titlePrefix: value } }))} />
                  <Field label="Акцент" value={content.hero.titleAccent} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, titleAccent: value } }))} />
                  <Field label="Заголовок после акцента" value={content.hero.titleSuffix} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, titleSuffix: value } }))} />
                  <Field className="md:col-span-2" label="Описание" value={content.hero.description} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, description: value } }))} multiline />
                  <ImageField className="md:col-span-2" label="Главное изображение" value={content.hero.image} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, image: value } }))} />
                  <Field label="Левая карточка заголовок" value={content.hero.floatingCardLeftTitle} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, floatingCardLeftTitle: value } }))} />
                  <Field label="Левая карточка текст" value={content.hero.floatingCardLeftText} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, floatingCardLeftText: value } }))} />
                  <Field label="Правая карточка заголовок" value={content.hero.floatingCardRightTitle} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, floatingCardRightTitle: value } }))} />
                  <Field label="Правая карточка текст" value={content.hero.floatingCardRightText} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, floatingCardRightText: value } }))} />
                </CardContent>
              </Card>
            ) : null}

            {activeSection === "about" ? (
              <SectionEditor
                title="Секция О нас"
                content={content.about}
                onContentChange={(about) => updateContent((current) => ({ ...current, about }))}
                imageLabels={["Фото 1", "Фото 2", "Фото 3"]}
              />
            ) : null}

            {activeSection === "production" ? (
              <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Секция Производство</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Field label="Eyebrow" value={content.production.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, eyebrow: value } }))} />
                  <Field label="Заголовок" value={content.production.title} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, title: value } }))} />
                  <Field label="Описание" value={content.production.description} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, description: value } }))} multiline />
                  {content.production.steps.map((step, index) => (
                    <div key={index} className="rounded-3xl border border-[#eadfce] bg-white p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-medium">Шаг {index + 1}</h4>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Field label="Номер" value={step.number} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, steps: current.production.steps.map((item, itemIndex) => itemIndex === index ? { ...item, number: value } : item) } }))} />
                        <Field label="Заголовок" value={step.title} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, steps: current.production.steps.map((item, itemIndex) => itemIndex === index ? { ...item, title: value } : item) } }))} />
                        <Field label="Описание" value={step.description} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, steps: current.production.steps.map((item, itemIndex) => itemIndex === index ? { ...item, description: value } : item) } }))} multiline />
                      </div>
                    </div>
                  ))}
                  <ImageField label="Баннер изображение" value={content.production.bannerImage} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, bannerImage: value } }))} />
                  <Field label="Баннер заголовок" value={content.production.bannerTitle} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, bannerTitle: value } }))} />
                  <Field label="Баннер текст" value={content.production.bannerText} onChange={(value) => updateContent((current) => ({ ...current, production: { ...current.production, bannerText: value } }))} multiline />
                </CardContent>
              </Card>
            ) : null}

            {activeSection === "visit" ? (
              <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Секция Посетить поле</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Field label="Eyebrow" value={content.visit.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, eyebrow: value } }))} />
                  <Field label="Заголовок" value={content.visit.title} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, title: value } }))} />
                  <Field label="Описание" value={content.visit.description} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, description: value } }))} multiline />
                  {content.visit.gallery.map((image, index) => (
                    <div key={index} className="grid gap-4 md:grid-cols-2">
                      <ImageField label={`Фото ${index + 1}`} value={image.src} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, gallery: current.visit.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, src: value } : item) } }))} />
                      <Field label={`Alt ${index + 1}`} value={image.alt} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, gallery: current.visit.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, alt: value } : item) } }))} />
                    </div>
                  ))}
                  <Field label="Подзаголовок" value={content.visit.heading} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, heading: value } }))} />
                  {content.visit.paragraphs.map((paragraph, index) => (
                    <Field key={index} label={`Абзац ${index + 1}`} value={paragraph} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, paragraphs: current.visit.paragraphs.map((item, itemIndex) => itemIndex === index ? value : item) } }))} multiline />
                  ))}
                  {content.visit.features.map((feature, index) => (
                    <div key={index} className="grid gap-4 md:grid-cols-2">
                      <Field label={`Фича ${index + 1} заголовок`} value={feature.title} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, features: current.visit.features.map((item, itemIndex) => itemIndex === index ? { ...item, title: value } : item) } }))} />
                      <Field label={`Фича ${index + 1} текст`} value={feature.text} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, features: current.visit.features.map((item, itemIndex) => itemIndex === index ? { ...item, text: value } : item) } }))} />
                    </div>
                  ))}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Кнопка текст" value={content.visit.ctaLabel} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, ctaLabel: value } }))} />
                    <Field label="Кнопка ссылка" value={content.visit.ctaLink} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, ctaLink: value } }))} />
                  </div>
                  <Field label="Баннер заголовок" value={content.visit.bannerTitle} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, bannerTitle: value } }))} />
                  <Field label="Баннер текст" value={content.visit.bannerText} onChange={(value) => updateContent((current) => ({ ...current, visit: { ...current.visit, bannerText: value } }))} multiline />
                </CardContent>
              </Card>
            ) : null}

            {activeSection === "contacts" ? (
              <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Контакты и ссылки</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <Field label="Название бренда" value={content.settings.brandName} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, brandName: value } }))} />
                  <Field label="Телефон" value={content.settings.phone} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, phone: value } }))} />
                  <Field label="Telegram ссылка" value={content.settings.telegram.href} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, telegram: { ...current.settings.telegram, href: value } } }))} />
                  <Field label="Telegram подпись" value={content.settings.telegram.value} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, telegram: { ...current.settings.telegram, value } } }))} />
                  <Field label="Viber ссылка" value={content.settings.viber.href} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, viber: { ...current.settings.viber, href: value } } }))} />
                  <Field label="Viber подпись" value={content.settings.viber.value} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, viber: { ...current.settings.viber, value } } }))} />
                  <Field label="Instagram ссылка" value={content.settings.instagram.href} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, instagram: { ...current.settings.instagram, href: value } } }))} />
                  <Field label="Instagram подпись" value={content.settings.instagram.value} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, instagram: { ...current.settings.instagram, value } } }))} />
                  <Field label="Часы работы" value={content.settings.workingHours} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, workingHours: value } }))} />
                  <Field label="Локация" value={content.settings.location} onChange={(value) => updateContent((current) => ({ ...current, settings: { ...current.settings, location: value } }))} multiline />
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 border-[#e0d2bd] bg-white" />
      ) : (
        <Input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 border-[#e0d2bd] bg-white" />
      )}
    </div>
  )
}

function SectionEditor({
  title,
  content,
  onContentChange,
  imageLabels,
}: {
  title: string
  content: SiteContent["about"]
  onContentChange: (content: SiteContent["about"]) => void
  imageLabels: string[]
}) {
  return (
    <Card className="border-[#e0d2bd] bg-[#fcfaf7] shadow-sm">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field label="Eyebrow" value={content.eyebrow} onChange={(value) => onContentChange({ ...content, eyebrow: value })} />
        <Field label="Заголовок" value={content.title} onChange={(value) => onContentChange({ ...content, title: value })} />
        <Field label="Описание" value={content.description} onChange={(value) => onContentChange({ ...content, description: value })} multiline />
        {content.gallery.map((image, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-2">
            <ImageField label={`${imageLabels[index] ?? "Фото"} изображение`} value={image.src} onChange={(value) => onContentChange({ ...content, gallery: content.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, src: value } : item) })} />
            <Field label={`${imageLabels[index] ?? "Фото"} alt`} value={image.alt} onChange={(value) => onContentChange({ ...content, gallery: content.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, alt: value } : item) })} />
          </div>
        ))}
        <Field label="Подзаголовок" value={content.heading} onChange={(value) => onContentChange({ ...content, heading: value })} />
        {content.paragraphs.map((paragraph, index) => (
          <Field key={index} label={`Абзац ${index + 1}`} value={paragraph} onChange={(value) => onContentChange({ ...content, paragraphs: content.paragraphs.map((item, itemIndex) => itemIndex === index ? value : item) })} multiline />
        ))}
        {content.features.map((feature, index) => (
          <Field key={index} label={`Фича ${index + 1}`} value={feature.title} onChange={(value) => onContentChange({ ...content, features: content.features.map((item, itemIndex) => itemIndex === index ? { ...item, title: value } : item) })} />
        ))}
      </CardContent>
    </Card>
  )
}

function ImageField({
  label,
  value,
  onChange,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setIsUploading(true)
    setUploadError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const payload = (await response.json()) as { ok: boolean; url?: string; error?: string }

      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.error || "Не удалось загрузить изображение.")
      }

      onChange(payload.url)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Не удалось загрузить изображение.")
    } finally {
      setIsUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2 rounded-2xl border border-[#e0d2bd] bg-white p-3">
        <div className="flex gap-3">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-[#efe4d8] bg-[#f4ede6]">
            {value ? (
              <img src={value} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center px-2 text-center text-xs text-[#9b8a7a]">Нет фото</div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-[#6B4C9A] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5e4288]"
              >
                {isUploading ? "Загружаем..." : "Загрузить файл"}
              </button>
              <p className="text-sm text-[#8f7c6a]">Или вставь ссылку вручную</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <Input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="https://..."
              className="border-[#e0d2bd] bg-white"
            />
          </div>
        </div>
        {uploadError ? <p className="text-sm text-red-600">{uploadError}</p> : null}
      </div>
    </div>
  )
}
