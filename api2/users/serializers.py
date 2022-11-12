from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('school', 'email', 'username', 'password', 'is_student', 'is_teacher', 'is_head', 'is_ministry')


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField()
    is_teacher = serializers.BooleanField()
    is_head = serializers.BooleanField()
    is_ministry = serializers.BooleanField()
    school = serializers.IntegerField()
    
    
    class Meta:
        model = User
        fields = ('school', 'email', 'username', 'password', 'is_student', 'is_teacher', 'is_head', 'is_ministry')

    def get_cleaned_data(self):
        return {
            'school': self.validated_data.get('school', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', ''),
            'is_head': self.validated_data.get('is_head', ''),
            'is_ministry': self.validated_data.get('is_ministry', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.school = self.cleaned_data.get('school')
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.is_head = self.cleaned_data.get('is_head')
        user.is_ministry = self.cleaned_data.get('is_ministry')
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_data = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_data')

    def get_user_data(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        is_head = serializer_data.get('is_head')
        is_ministry = serializer_data.get('is_ministry')
        school = serializer_data.get('school')
        username = serializer_data.get('username')
        return {
            'is_student': is_student,
            'is_teacher': is_teacher,
            'is_head': is_head,
            'is_ministry': is_ministry,
            'school': school,
            'username': username,
            
        }
