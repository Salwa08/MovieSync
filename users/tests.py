from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

class CheckEmailExistenceTests(APITestCase):

    def setUp(self):
        # Create a test user
        self.test_email = 'testuser@example.com'
        self.user = User.objects.create_user(username='testuser', email=self.test_email, password='password123')
        self.url = reverse('check_email_existence')

    def test_email_exists(self):
        # Test with an email that exists in the database
        response = self.client.post(self.url, {'email': self.test_email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_email_does_not_exist(self):
        # Test with an email that does not exist in the database
        response = self.client.post(self.url, {'email': 'nonexistent@example.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_email_not_provided(self):
        # Test with no email provided in the request
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
