import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AcademicApiService } from '../../services/academic-api.service';
import { CategoryView } from '../../models/category.model';
import { ProductView } from '../../models/product.model';
import { TaskView } from '../../models/task.model';
import { TaskStatus, TaskPriority } from '../../models/task.model';


@Component({
  selector: 'app-http-services-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './http-services.page.html',
})
export class HttpServicesPage {
  /*
   * Objetivo del ejercicio:
   * Consumir el backend real con HttpClient y Observables.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar que variables terminan con $ porque son Observables.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar manejo visual de error con catchError.
   *
   * Actividad 3, nivel intermedio:
   * - Completar los mappers para que no se muestren textos "TODO".
   *
   * Actividad 4, nivel reto:
   * - Crear un boton que haga POST de una tarea.
   *
   * Criterio de aceptacion:
   * - No suscribirse manualmente si async pipe es suficiente.
   * - Usar subscribe solo para acciones imperativas como POST.
   * - Mostrar al usuario si el backend no esta disponible.
   */
  private readonly academicApi = inject(AcademicApiService);

  readonly categories$: Observable<CategoryView[]> = this.academicApi.getCategories().pipe(
    catchError(() => of([])),
  );

  readonly products$: Observable<ProductView[]> = this.academicApi.getProducts().pipe(
    catchError(() => of([])),
  );

  readonly tasks$: Observable<TaskView[]> = this.academicApi.getTasks().pipe(
    catchError(() => of([])),
  );

  readonly exampleJson = {
    endpoint: '/api/tasks',
    method: 'GET',
    topic: 'json',
  };

createExampleTask(): void {
const payload = {
  title: 'Nueva tarea desde Angular',
  description: null,
  priority: 'high' as TaskPriority,
  subtasks: [],
  student_id: 1,
  due_date: null,
  status: 'pending' as TaskStatus,
};


  this.academicApi.createTask(payload).subscribe();
}


}
