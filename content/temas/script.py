import csv
import os

with open("datos.csv") as csv_file:
    reader = csv.reader(csv_file)
    data = [row for row in reader]

for i, entry in enumerate(data):
    entry = [item.replace('"','') for item in entry]
    markdown = []
    markdown.append('---')
    markdown.append(f'titulo: "{entry[3]}"')
    if entry[2] != '':
        markdown.append(f'artista: "{entry[2]}"')
    else:
        markdown.append(f'artista: "{entry[1]}"')
    markdown.append(f'instagram: "{entry[4]}"')
    markdown.append(f'orden: {str(i+1)}')
    markdown.append(f'imagen: "./{i+1:02d}.png"')
    markdown.append(f'tiempo: "{entry[5]}"')
    markdown.append('')
    
    # Esto después se automatizará
    markdown.append('transicion: cubrir')
    markdown.append('color_transicion: "#000000"')
    markdown.append('direccion_transicion: derecha')
    markdown.append('duracion_transicion: 1')
    markdown.append('color_sitio: "#000000"')
    markdown.append('color_navegacion: "#ffffff"')
    markdown.append('color_navegacion_hover: "#545454"')
    markdown.append('color_fondo: "#ffffff"')
    markdown.append('color_letra: "#000000"')
    markdown.append('color_links: "#065A82"')
    markdown.append('color_links_hover: "#1C7293"')
    ###
    
    markdown.append('---')
    print(markdown)
    filename = f'./{i+1:02d}/index.md'
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, 'w') as f:
        for item in markdown:
            f.write(f'{item}\n')
