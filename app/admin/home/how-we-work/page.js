'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function HowWeWorkPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            subtitle: '',
            cta_text: '',
            cta_link: '',
            pillars: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pillars"
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/home-sections/how-we-work')
            if (!res.ok) throw new Error('Failed to fetch data')
            const data = await res.json()
            reset(data)
        } catch (error) {
            console.error(error)
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        setSaving(true)
        try {
            const res = await fetch('/api/home-sections/how-we-work', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to save')

            const updated = await res.json()
            reset(updated)
            toast.success('Section updated successfully')
        } catch (error) {
            console.error(error)
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">How We Work Section</h1>
                <Button onClick={handleSubmit(onSubmit)} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>General Content</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Section Title</Label>
                            <Input {...register('title')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Subtitle</Label>
                            <Textarea {...register('subtitle')} className="h-24" />
                        </div>
                        <div className="space-y-2">
                            <Label>CTA Text</Label>
                            <Input {...register('cta_text')} />
                        </div>
                        <div className="space-y-2">
                            <Label>CTA Link</Label>
                            <Input {...register('cta_link')} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Pillars (Cards)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-card/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 text-destructive"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <h4 className="text-sm font-bold text-muted-foreground">Pillar {index + 1}</h4>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input {...register(`pillars.${index}.title`)} placeholder="e.g. Discovery First" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea {...register(`pillars.${index}.description`)} placeholder="Description..." />
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => append({ title: '', description: '' })} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Pillar
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
