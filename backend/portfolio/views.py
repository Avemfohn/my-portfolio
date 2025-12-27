from rest_framework import viewsets, mixins
from .models import Project, Skill, Experience, ContactMessage
from .serializers import ProjectSerializer, SkillSerializer, ExperienceSerializer, ContactMessageSerializer
from django.db.models import F
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.exceptions import ValidationError

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):

        if self.request.data.get('website_url_honeypot'):
            print("Bot has been detected! (Honeypot field filled)")
            return

        data = serializer.validated_data
        message_content = data.get('message', '').lower()
        name_content = data.get('name', '').lower()


        forbidden_words = [
            # --- CRYPTO & INVESTMENT ---
            'crypto', 'bitcoin', 'btc', 'eth', 'ethereum', 'forex', 'binance',
            'investment', 'invest', 'trading', 'profit', 'wallet', 'passive income',

            # --- BETTING & GAMBLING ---
            'casino', 'betting', 'slot', 'poker', 'bonus', 'jackpot', 'prize',
            'lottery', 'gambling', 'bet', 'win big',

            # --- SEXUAL & DATING ---
            'sex', 'porn', 'dating', 'viagra', 'cialis', 'adult', 'girls',
            'lover', 'naked', 'xxx', 'erotic', 'fuck', 'shit',

            # --- MARKETING & URGENT BOTS ---
            'seo', 'ranking', 'traffic', 'backlink', 'marketing', 'promotion',
            'act now', 'urgent', 'winner', 'click here', 'buy now', 'free money',
            'financial freedom', 'debt', 'loan', 'credit card', 'offer',

            # --- TECHNICAL PENETRATION TESTING ATTEMPTS ---
            'http', 'https', 'www', '.com', '.net', '.org', 'url',
            '[url', '<a href', 'javascript', 'script'
        ]


        if any(word in message_content for word in forbidden_words) or \
           any(word in name_content for word in forbidden_words):

            print("Spam has been detected and discarded.")
            return

        instance = serializer.save()

        try:
            subject = f"New Contact Message: {instance.name}"

            email_body = f"""
            A new contact message has been received from the website.

            Sender: {instance.name}
            Email Address: {instance.email}

            Message:
            {instance.message}
            """

            send_mail(
                subject,
                email_body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
                connection=None,
                html_message=None
            )
            print("Mail sent successfully!")

        except Exception as e:
            print(f"Mail error: {e}")