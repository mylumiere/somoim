from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from .decorators import *
from .models import User
from .forms import RegisterForm
from django.views.generic import View, CreateView
from django.contrib import messages
from django.core.exceptions import PermissionDenied

@method_decorator(logout_message_required, name='dispatch')
class AgreementView(View):
    def get(self, request, *args, **kwargs):
        request.session['agreement'] = False
        print(1)
        return render(request, 'users/agreement.html')

    def post(self, request, *args, **kwarg):
        if request.POST.get('agreement1', False) and request.POST.get('agreement2', False):
            request.session['agreement'] = True
            return redirect('/users/register/')
        else:
            messages.info(request, "약관에 모두 동의해주세요.")
            return render(request, 'users/agreement.html')

class RegisterView(CreateView):
    model = User
    template_name = 'users/register.html'
    form_class = RegisterForm

    def get(self, request, *args, **kwargs):
        if not request.session.get('agreement', False):
            raise PermissionDenied
        request.session['agreement'] = False
        return super().get(request, *args, **kwargs)

    def get_success_url(self):
        messages.success(self.request, "회원가입 성공.")
        return redirect('users:login')

    def form_valid(self, form):
        self.object = form.save()
        return redirect(self.get_success_url())

# Create your views here.
