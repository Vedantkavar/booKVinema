# Generated by Django 4.2.11 on 2024-04-17 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MovieRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=150)),
                ('moviname', models.CharField(max_length=255)),
                ('moviedate', models.DateField()),
            ],
        ),
    ]
