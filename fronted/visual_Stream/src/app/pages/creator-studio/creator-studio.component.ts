import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creator-studio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creator-studio.component.html',
  styleUrl: './creator-studio.component.scss'
})
export class CreatorStudioComponent {
  activeTab = signal<'upload' | 'monetization' | 'analytics'>('upload');

  // Upload form
  videoTitle = signal('');
  videoDescription = signal('');
  selectedCategory = signal('');
  tags = signal<string[]>(['Cortometraje', 'Indie']);
  newTag = signal('');
  isDragging = signal(false);
  uploadProgress = signal(0);
  isUploading = signal(false);

  categories = [
    'Cortometrajes', 'Documentales', 'Animación', 'Música',
    'Videoclips', 'Experimental', 'Tutoriales', 'Otro'
  ];

  // Monetization
  accessPrice = signal('4.99');
  donationsEnabled = signal(true);
  minDonation = signal('1.00');

  // Analytics mock
  analytics = signal({
    totalViews: '12,847',
    subscribers: '1,234',
    revenue: '$2,156',
    engagement: '78%'
  });

  setTab(tab: 'upload' | 'monetization' | 'analytics') {
    this.activeTab.set(tab);
  }

  addTag() {
    const tag = this.newTag().trim();
    if (tag && !this.tags().includes(tag)) {
      this.tags.update(tags => [...tags, tag]);
      this.newTag.set('');
    }
  }

  removeTag(tag: string) {
    this.tags.update(tags => tags.filter(t => t !== tag));
  }

  onTagKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave() {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    this.simulateUpload();
  }

  selectFile() {
    this.simulateUpload();
  }

  simulateUpload() {
    this.isUploading.set(true);
    this.uploadProgress.set(0);
    const interval = setInterval(() => {
      this.uploadProgress.update(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 80);
  }

  toggleDonations() {
    this.donationsEnabled.update(v => !v);
  }
}
