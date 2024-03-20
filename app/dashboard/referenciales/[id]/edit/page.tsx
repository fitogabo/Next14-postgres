import Form from '@/app/ui/referenciales/edit-form';
import Breadcrumbs from '@/app/ui/referenciales/breadcrumbs';
import { fetchReferencialById } from '@/app/lib/referenciales';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const referencial: ReferencialForm | undefined = await fetchReferencialById(id);

    if (!referencial) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Referenciales', href: '/dashboard/referenciales' },
                    {
                        label: 'Edit Referencial',
                        href: `/dashboard/referenciales/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form referencial={referencial!} />
        </main>
    );
}