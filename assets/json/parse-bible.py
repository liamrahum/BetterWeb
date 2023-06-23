import json

# Open the input and output files
with open('kjv-bible.json', 'r') as input_file, open('output_file.json', 'w') as output_file:

    # Initialize an empty dictionary to store the data
    data = {}

    # Loop through each line in the input file
    for line in input_file:

        # Parse the line into a dictionary
        line_data = json.loads(line)

        # Get the book name, chapter number, and verse number
        book_name = line_data['book_name']
        chapter_number = line_data['chapter']
        verse_number = line_data['verse']

        # Get the text of the verse
        verse_text = line_data['text']

        # Check if the book already exists in the data dictionary
        if book_name in data:

            # If the book exists, append the verse to the existing chapter
            chapter_exists = False
            for chapter in data[book_name]:
                if chapter.get(str(chapter_number)):
                    chapter[str(chapter_number)].update({str(verse_number): verse_text})
                    chapter_exists = True
                    break
            if not chapter_exists:
                data[book_name].append({str(chapter_number): {str(verse_number): verse_text}})

        else:

            # If the book does not exist, create a new chapter and verse
            data[book_name] = [{str(chapter_number): {str(verse_number): verse_text}}]

    # Write the data to the output file in JSON format
    json.dump(data, output_file)
