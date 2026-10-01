import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  isLiked = signal(false);
  showDonationModal = signal(false);
  selectedDonation = signal(5);

  video = signal({
    id: 1,
    title: 'El Último Amanecer — Un cortometraje sobre la resiliencia',
    creator: 'María Solís',
    creatorAvatar: 'MS',
    subscribers: '4.2K suscriptores',
    description: 'Una historia visual que explora los límites de la esperanza humana a través de paisajes sonoros inmersivos y cinematografía contemplativa. Filmado durante 3 meses en locaciones remotas de Sudamérica, este cortometraje busca capturar la esencia de la perseverancia humana frente a la adversidad.',
    views: '24,521 vistas',
    date: '15 de septiembre, 2026',
    likes: 1847,
    category: 'Cortometraje'
  });

  relatedVideos = signal([
    { id: 2, title: 'Raíces Digitales — Documental Interactivo', creator: 'Carlos Vega', views: '18.2K', duration: '32:15', avatar: 'CV' },
    { id: 3, title: 'Sinfonía Urbana — Visuales Generativos', creator: 'Ana Ruiz', views: '12.8K', duration: '8:45', avatar: 'AR' },
    { id: 4, title: 'Origami en Movimiento — Stop Motion', creator: 'Diego Torres', views: '31.1K', duration: '12:30', avatar: 'DT' },
    { id: 5, title: 'Ecos del Pacífico — Documental', creator: 'Laura Chen', views: '9.4K', duration: '45:20', avatar: 'LC' },
    { id: 6, title: 'Luces de Medianoche — Videoclip', creator: 'Banda Nómada', views: '56.7K', duration: '4:18', avatar: 'BN' }
  ]);

  toggleLike() {
    this.isLiked.update(v => !v);
  }

  openDonation() {
    this.showDonationModal.set(true);
  }

  closeDonation() {
    this.showDonationModal.set(false);
  }

  setDonation(amount: number) {
    this.selectedDonation.set(amount);
  }
}
