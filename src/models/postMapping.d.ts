export type PostMapping = {
    id: number;
    title: string;
    description: string;
    category: string | undefined;
    tags: string[] | undefined[];
    slug: string;
    image: Image;
}

type Image = {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
}