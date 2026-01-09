from rest_framework import permissions
import os

class IsNextJSOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True

        secret_key = request.headers.get('X-Portfolio-Secret')
        expected_key = os.getenv('PORTFOLIO_API_SECRET', 'gecici-gizli-sifre')


        print(f"🔍 DEBUG LOGS 🔍")
        print(f"Gelen Request Path: {request.path}")
        print(f"Gelen Header (X-Portfolio-Secret): {secret_key}")
        print(f"Backend Beklenen (Env): {expected_key}")
        print(f"Eşleşiyor mu?: {secret_key == expected_key}")
        # --- DEBUG BİTİŞ ---

        if request.method in permissions.SAFE_METHODS and secret_key == expected_key:
            return True

        return False