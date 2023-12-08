export default {
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.custom(image => {
                if (!image) return true
                const { dimensions } = decodeAssetId(image.asset._ref)
                if(dimensions.width === 500 && dimensions.height === 750)
                    return true
                return "Image doesnt meet requirements of 500w 750h. Current image size: W: " + dimensions.width + " H: "+ dimensions.height
            })
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: "description",
            title: "Description",
            type: "text"
        }
    ]
};
const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/

const decodeAssetId = id => {
    const [, assetId, dimensions, format] = pattern.exec(id)
    const [width, height] = dimensions.split("x").map(v => parseInt(v, 10))

    return {
        assetId,
        dimensions: {width, height},
        format,
    }
}