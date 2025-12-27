from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage

@receiver(post_save, sender=ContactMessage)
def send_notification_email(sender, instance, created, **kwargs):
    if created:
        subject = f"New Message from Portfolio: {instance.name}"
        message = f"""
        You have a new message from your website!

        Sender: {instance.name}
        Email: {instance.email}

        Message:
        {instance.message}
        """

        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                ['mertcan@example.com'],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Mail gönderme hatası: {e}")