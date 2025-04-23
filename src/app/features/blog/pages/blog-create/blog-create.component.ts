import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CreateBlogDto } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';  // Agregado
import { ReactiveFormsModule } from '@angular/forms';  // Agregado

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]  // Importación de módulos
})
export class BlogCreateComponent {
  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    // Definimos el FormGroup con los nuevos campos
    this.blogForm = this.fb.group({
      title: ['', Validators.required],        // Título
      content: ['', Validators.required],      // Contenido
      summary: ['', Validators.required],      // Resumen
      tags: [''],                              // Etiquetas
      imageUrl: [''],                          // URL de la imagen
      isPublic: [false]                        // Checkbox de "Público"
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formValues = this.blogForm.value;
      const tagsValue = formValues.tags || '';
      
      const blogData: CreateBlogDto = {
        ...formValues,
        tags: tagsValue.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      };
  
      console.log('Enviando datos del blog:', blogData);
      
      this.blogService.createBlog(blogData).subscribe({
        next: (response) => {
          console.log('Blog creado exitosamente:', response);
          this.router.navigate(['/blogs']);  // Aquí actualizas la ruta
        },
        error: (err) => {
          console.error('Error al crear el blog:', err);
         
        }
      });
    }
  }
}
