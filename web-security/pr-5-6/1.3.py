from django.http import HttpResponse
from django.conf import settings

def upload_file(request):
    if request.method == 'POST':
        file = request.FILES['file']

        # Проверка типа файла
        allowed_extensions = ['.pdf', '.docx', '.jpg', '.png']
        if file.name.split('.')[-1].lower() not in [ext[1:] for ext in allowed_extensions]:
            return HttpResponse('Invalid file type', status=400)

        max_size = 10 * 1024 * 1024
        if file.size > max_size:
            return HttpResponse('File too large', status=400)

        with open(f'{settings.MEDIA_ROOT}/{file.name}', 'wb') as f:
            for chunk in file.chunks():
                f.write(chunk)

    return HttpResponse('File uploaded')