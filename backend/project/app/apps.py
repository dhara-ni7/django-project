from django.apps import AppConfig

class AppConfigApp(AppConfig):   # 🔥 Different class name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
