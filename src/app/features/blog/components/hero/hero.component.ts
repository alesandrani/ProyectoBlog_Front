import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-hero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: 'blog-hero.component.html',  
  styleUrls: ['blog-hero.component.scss']  
})
export class BlogHeroComponent {}
