import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  pregunta: string;
  respuesta: string;
  abierto: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  faqs: FaqItem[] = [
    { pregunta: '¿Necesito conocimientos previos para inscribirme?',
      respuesta: 'No. La mayoría de nuestros cursos están diseñados para comenzar desde cero. Cada curso indica claramente en su descripción si requiere conocimiento previo. Si eres principiante, te recomendamos iniciar con nuestro curso gratuito "Fundamentos de Programación".',
      abierto: false },
    { pregunta: '¿Cuánto tiempo tengo acceso a los cursos?',
      respuesta: 'Una vez inscrito, tienes acceso de por vida al contenido grabado, incluyendo todas las actualizaciones futuras. Para las clases en vivo, las grabaciones quedan disponibles dentro de las primeras 24 horas después de cada sesión.',
      abierto: false },
    { pregunta: '¿Los certificados son reconocidos por empresas?',
      respuesta: 'Sí. Nuestros certificados son reconocidos por más de 300 empresas del sector tecnológico en Colombia y Latinoamérica, incluyendo Rappi, Globant, Bancolombia y Mercado Libre. Cada certificado incluye un código QR de verificación para compartir en LinkedIn.',
      abierto: false },
    { pregunta: '¿Puedo cancelar mi suscripción en cualquier momento?',
      respuesta: 'Absolutamente. No hay contratos de permanencia ni penalizaciones. Puedes cancelar tu plan Pro o Empresas en cualquier momento desde configuración. Al cancelar, conservas acceso hasta el final del período pagado y mantienes todos los certificados obtenidos.',
      abierto: false },
    { pregunta: '¿Cómo funcionan las mentorías personalizadas?',
      respuesta: 'Las mentorías son sesiones individuales de 45 minutos vía videollamada con profesionales activos de la industria. Puedes usarlas para revisar código, orientación de carrera, preparación para entrevistas o dudas técnicas. Se agendan desde tu dashboard con hasta 7 días de anticipación.',
      abierto: false },
    { pregunta: '¿Hay descuentos para estudiantes universitarios?',
      respuesta: 'Sí. Ofrecemos un 40% de descuento en el plan Pro para estudiantes universitarios activos. Solo debes enviarnos tu carné o certificado de matrícula vigente al correo hola@mentedigitalaaa.co y en menos de 24 horas activamos tu descuento.',
      abierto: false },
    { pregunta: '¿Puedo aprender desde mi celular o tablet?',
      respuesta: 'Sí, nuestra plataforma está completamente optimizada para móviles y tablets. Puedes ver videos, completar ejercicios, participar en el foro y hacer seguimiento de tu progreso desde cualquier dispositivo con conexión a internet.',
      abierto: false },
    { pregunta: '¿Qué pasa si un curso no cumple mis expectativas?',
      respuesta: 'Tenemos una política de garantía de satisfacción de 30 días. Si dentro de ese período sientes que el curso no cumplió tus expectativas, te devolvemos el 100% de tu inversión sin hacer preguntas. Tu satisfacción es nuestra prioridad.',
      abierto: false },
  ];

  toggle(item: FaqItem): void {
    const wasOpen = item.abierto;
    this.faqs.forEach(f => f.abierto = false);
    item.abierto = !wasOpen;
  }
}
