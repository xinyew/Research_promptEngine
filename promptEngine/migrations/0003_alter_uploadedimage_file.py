# Generated by Django 4.2.4 on 2023-08-14 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promptEngine', '0002_uploadedimage_content_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadedimage',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]