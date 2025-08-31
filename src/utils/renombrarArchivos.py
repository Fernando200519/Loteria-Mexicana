import os

# Define la ruta de la carpeta donde están tus archivos.
# Asegúrate de cambiar 'ruta/a/tu/carpeta' por la ruta real en tu computadora.
ruta_carpeta = 'C:\\Users\\ferch\\OneDrive\\Escritorio\\loteria-mexicana\\assets\\cards'

# Obtén la lista de todos los archivos .jpg en la carpeta.
# El método `sorted()` asegura que los archivos se procesen en un orden consistente.
archivos_jpg = sorted([f for f in os.listdir(ruta_carpeta) if f.endswith('.jpg')])

# Inicializa un contador para los nuevos nombres.
contador = 1

# Itera sobre la lista de archivos y renombra cada uno.
for nombre_viejo in archivos_jpg:
    # Construye el nuevo nombre del archivo.
    nuevo_nombre = f'{contador}.jpg'

    # Crea la ruta completa para el archivo viejo y el nuevo.
    ruta_vieja = os.path.join(ruta_carpeta, nombre_viejo)
    ruta_nueva = os.path.join(ruta_carpeta, nuevo_nombre)

    # Renombra el archivo.
    os.rename(ruta_vieja, ruta_nueva)

    # Incrementa el contador para el siguiente archivo.
    contador += 1

print('¡Archivos renombrados exitosamente!')