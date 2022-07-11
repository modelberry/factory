# Pull content

## Entry links

Create a file for each content type. Each file contains an exported constant.
The constant is an array with entries.

Entry links are handled depending on the entry data. Three possible entry link
formats exist:

1. `{ fieldA, fieldB }` - No sys field exists, this will create a new entry.
2. `{ fieldA, fieldB, sys: { id } }` - The existing `sys.id` field will be updated,
   if the id does not exist, a new entry with the `id` is created.
3. `{ sys: { id } }` - A link to the entry with `sys.id` is created

Data pulled from Contentful is written to a source file using format #3
