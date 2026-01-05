'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function PartnershipsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/home-sections/partnerships')
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
            const res = await fetch('/api/home-sections/partnerships', {
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
                <h1 className="text-3xl font-bold">Partnerships Section</h1>
                <Button onClick={handleSubmit(onSubmit)} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Section Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input {...register('title')} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea {...register('description')} />
                    </div>

                    <div className="mt-8 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Note on Logos</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Brand logos for this section are managed separately in the Client Logos section.
                        </p>
                        <Button variant="outline" asChild>
                            <Link href="/admin/client-logos">Manage Client Logos</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
