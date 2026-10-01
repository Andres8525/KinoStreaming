import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoCardComponent } from '../../components/video-card/video-card.component';

interface Video {
  id: number;
  title: string;
  creator: string;
  creatorAvatar: string;
  thumbnail: string;
  views: string;
  duration: string;
  category: string;
  timeAgo: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, VideoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  categories = signal<string[]>([
    'Todo', 'Cortometrajes', 'Documentales', 'Animación', 'Música', 'Videoclips', 'Experimental', 'Tutoriales'
  ]);

  activeCategory = signal('Todo');

  featuredVideo = signal({
    id: 1,
    title: 'El Último Amanecer — Un cortometraje sobre la resiliencia',
    creator: 'María Solís',
    description: 'Una historia visual que explora los límites de la esperanza humana a través de paisajes sonoros inmersivos y cinematografía contemplativa.',
    thumbnail: '',
    category: 'Cortometraje',
    views: '24.5K vistas',
    duration: '18:42'
  });

  recommendedVideos = signal<Video[]>([
    {
      id: 2,
      title: 'Raíces Digitales — Documental Interactivo',
      creator: 'Carlos Vega',
      creatorAvatar: 'CV',
      thumbnail: '',
      views: '18.2K',
      duration: '32:15',
      category: 'Documental',
      timeAgo: 'Hace 2 días'
    },
    {
      id: 3,
      title: 'Sinfonía Urbana — Visuales Generativos',
      creator: 'Ana Ruiz',
      creatorAvatar: 'AR',
      thumbnail: '',
      views: '12.8K',
      duration: '8:45',
      category: 'Experimental',
      timeAgo: 'Hace 5 días'
    },
    {
      id: 4,
      title: 'Origami en Movimiento — Animación Stop Motion',
      creator: 'Diego Torres',
      creatorAvatar: 'DT',
      thumbnail: '',
      views: '31.1K',
      duration: '12:30',
      category: 'Animación',
      timeAgo: 'Hace 1 semana'
    },
    {
      id: 5,
      title: 'Ecos del Pacífico — Documental Ambiental',
      creator: 'Laura Chen',
      creatorAvatar: 'LC',
      thumbnail: '',
      views: '9.4K',
      duration: '45:20',
      category: 'Documental',
      timeAgo: 'Hace 3 días'
    },
    {
      id: 6,
      title: 'Luces de Medianoche — Videoclip Oficial',
      creator: 'Banda Nómada',
      creatorAvatar: 'BN',
      thumbnail: '',
      views: '56.7K',
      duration: '4:18',
      category: 'Música',
      timeAgo: 'Hace 1 día'
    },
    {
      id: 7,
      title: 'Código Creativo — Tutorial de Arte Generativo',
      creator: 'Pablo Mendez',
      creatorAvatar: 'PM',
      thumbnail: '',
      views: '7.3K',
      duration: '22:05',
      category: 'Tutorial',
      timeAgo: 'Hace 4 días'
    },
    {
      id: 8,
      title: 'Susurros del Bosque — Cortometraje Contemplativo',
      creator: 'Elena Vidal',
      creatorAvatar: 'EV',
      thumbnail: '',
      views: '15.9K',
      duration: '14:55',
      category: 'Cortometraje',
      timeAgo: 'Hace 6 días'
    },
    {
      id: 9,
      title: 'Pixel Dreams — Animación Experimental',
      creator: 'Marco Reyes',
      creatorAvatar: 'MR',
      thumbnail: '',
      views: '22.4K',
      duration: '6:38',
      category: 'Animación',
      timeAgo: 'Hace 2 semanas'
    }
  ]);

  trendingVideos = signal<Video[]>([
    {
      id: 10,
      title: 'La Ruta de las Estrellas — Time-Lapse',
      creator: 'Sofía Luna',
      creatorAvatar: 'SL',
      thumbnail: '',
      views: '41.2K',
      duration: '10:15',
      category: 'Documental',
      timeAgo: 'Hace 12 horas'
    },
    {
      id: 11,
      title: 'Danza Mecánica — Performance Visual',
      creator: 'Ricardo Paz',
      creatorAvatar: 'RP',
      thumbnail: '',
      views: '8.6K',
      duration: '7:22',
      category: 'Experimental',
      timeAgo: 'Hace 1 día'
    },
    {
      id: 12,
      title: 'Acuarelas Vivas — Proceso Artístico',
      creator: 'Camila Ortiz',
      creatorAvatar: 'CO',
      thumbnail: '',
      views: '19.8K',
      duration: '16:40',
      category: 'Tutorial',
      timeAgo: 'Hace 3 días'
    },
    {
      id: 13,
      title: 'Horizonte Infinito — Drone Cinematografía',
      creator: 'Andrés Gil',
      creatorAvatar: 'AG',
      thumbnail: '',
      views: '33.5K',
      duration: '20:10',
      category: 'Documental',
      timeAgo: 'Hace 5 días'
    }
  ]);

  scrollPosition = signal(0);

  setCategory(category: string) {
    this.activeCategory.set(category);
  }

  scrollCarousel(direction: 'left' | 'right', carouselId: string) {
    const container = document.getElementById(carouselId);
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}
