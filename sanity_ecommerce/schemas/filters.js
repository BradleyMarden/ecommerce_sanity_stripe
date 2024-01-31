export default {
    name: "filters",
    title: "Filters",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
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