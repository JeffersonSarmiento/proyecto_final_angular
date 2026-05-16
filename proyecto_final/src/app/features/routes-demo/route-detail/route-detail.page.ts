import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AcademicApiService } from '../../../services/academic-api.service';

@Component({
  selector: 'app-route-detail-page',
  imports: [RouterLink, NgIf],
  templateUrl: './route-detail.page.html',
})
export class RouteDetailPage {
  /*
   * Objetivo del ejercicio:
   * Leer parametros de ruta.
   *
   * Que debe completar el estudiante:
   * Actividad 1:
   * - Convertir routeId a numero y validar que sea un entero positivo.
   *
   * Actividad 2:
   * - Crear en AcademicApiService un metodo getTaskById(id).
   *
   * Actividad 3:
   * - Usar ese metodo para consultar un detalle real al backend.
   *
   * Pista:
   * ActivatedRoute permite acceder a snapshot.paramMap o params como Observable.
   *
   * Criterio de aceptacion:
   * - Si id no es valido, la pantalla debe mostrar un mensaje.
   * - Si el backend responde 404, se debe mostrar "No encontrado".
   */
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(AcademicApiService);

  readonly routeId = computed(() => this.route.snapshot.paramMap.get('id') ?? 'sin-id');

  readonly idNumber = computed(() => {
    const n = Number(this.routeId());
    return Number.isInteger(n) && n > 0 ? n : null;
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly task = signal<any>(null);

  constructor() {
    const id = this.idNumber();
    if (!id) {
      this.error.set('ID inválido');
      return;
    }

    this.loading.set(true);

    this.api.getTaskById(id).subscribe({
      next: (task) => {
        this.task.set(task);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No encontrado');
        this.loading.set(false);
      },
    });
  }
}
