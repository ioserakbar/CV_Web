import { Component, ElementRef, HostListener, inject, Inject, ViewChild} from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Title} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ability } from '../data/ability';
import { Education } from '../data/education';
import { Experience } from '../data/experience';
import { Interest } from '../data/interest';
import { confetti } from '@tsparticles/confetti';
import { Language } from '../data/language';
import { ELanguages } from '../data/enums/languages.enum';
import { EMobileMenuOptions } from '../data/enums/mobileOptions.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faBars, faArrowTurnDown, faMap, faCaretDown, faLanguage, faDownload, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import { OnVisibleAnimation } from './directives/onVisibleAnimation.directive';
@Component({
    selector: 'app-root',
    imports: [FontAwesomeModule, OnVisibleAnimation, ReactiveFormsModule], 
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {

    router = inject(Router);

    faCircle = faCircle;
    faBars = faBars;
    faArrowTurnDown = faArrowTurnDown;
    faMap = faMap;
    faLanguage = faLanguage;
    faCaretDown = faCaretDown;
    faDownload = faDownload;
    faCaretUp = faCaretUp;

    lang = ELanguages;
    options = EMobileMenuOptions;
    displayLanguage:ELanguages = ELanguages.EN;
    isKorokSearchActive = false;
    korokSearchSring = $localize `¡Atrapa los 16 Koroks!`;
    korokControllerList = new FormArray<FormControl<boolean | null>>([]);
    // We add one more so we can use valueChanges as a click detector
    totalKoroks = 17;
    koroksFound = 0;
    winAnimationDuration = 5000;
    korokLeft = this.totalKoroks;
    allKoroksFound = false;

    isSearchigForJob = true;
    isMobileMenuOpen = false;
    isGoToMenuOpen = false;
    isLanguageMenuOpen = false;
    isDownloadMenuOpen = false;



    @ViewChild('menuContent') menuContent!: ElementRef;
    @ViewChild('GoToContent') goToContent!: ElementRef;
    @ViewChild('LangContent') langContent!: ElementRef;
    @ViewChild('DownloadContent')downloadContent!: ElementRef;
    @ViewChild('start') start!: ElementRef;

    constructor(private titleService: Title){
        this.titleService.setTitle($localize `Adrián Garza - Programador Full-Stack`);
    }

    ngOnInit(){
        var korokNumber = 16;
        for (let i = 0; i < korokNumber; i++) {
            this.korokControllerList.push(new FormControl(false))
        }
        this.korokControllerList.valueChanges.subscribe(() => {
            this.koroksFound++;
            this.korokLeft = this.totalKoroks - this.koroksFound;
            if(this.korokLeft == 0){
                this.isKorokSearchActive = false;
                this.korokSearchEnd()
            }
        });

        console.log(window.location.href)
        var currentLanguage = window.location.href.split("/").at(-2)
        if(currentLanguage == "es"){
            this.displayLanguage = ELanguages.ES;
        }
        else{
            this.displayLanguage = ELanguages.EN;
        }
    }

    korokSearchEnd(){
        this.allKoroksFound = true;
        this.fireNormalConfetti();
        setTimeout(() => {
            this.resetKorokSearch()
        }, this.winAnimationDuration)
    }

    fireNormalConfetti() {
        const duration = this.winAnimationDuration,
            animationEnd = Date.now() + duration,
            defaults = {
                startVelocity: 60,
                spread: 1000,
                scalar: 2,
                ticks: 120,
                zIndex: 900
            };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: Math.random() * (.2) + .1,
                    y: Math.random() - .2
                }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: Math.random() * (.2) + .7,
                    y: Math.random() - .2
                }
            }));
        }, 250);
    }

    resetKorokSearch(){
        this.allKoroksFound = false;
        this.koroksFound = 0;
        this.korokLeft = this.totalKoroks;
        this.korokControllerList.reset();
    }
    
    Skills = [   
        new Ability($localize `Habilidades suaves`, [$localize `Aprendizaje autónomo`,$localize `Resolución de problemas`,$localize `Pensamiento crítico`,$localize `Trabajo en Equipo`]),
        new Ability($localize `Frontend`, ["Angular", "HTML5", "CSS3", "JavaScript ES6+", "TypeScript"]),
        new Ability($localize `Backend`, ["C#", ".NET", "RESTful API", "Node.js", "Python"]),
        new Ability($localize `Bases de Datos`, ["Azure Cosmos DB", "SQL Server", "My SQL", "MongoDB"]),
        new Ability($localize `DevOps`, ["Docker", "Git", "Scripting"]),
        new Ability($localize `Automatización`, ["Selenium"]),
        new Ability($localize `Workflows`, ["Agile", "Scrum"]),
    ]

    Languages = [
        new Language($localize `Español`, $localize `Nativo`),
        new Language($localize `Inglés`, $localize `Avanzado`)
    ]

    Education = [
        new Education(
            $localize `Universidad Humanista de las Américas`, 
            $localize `Licenciado en Paleontología`, 
            $localize `2024 - Hoy`, 
            false,
            null,
            "Logo_UHA.png",
            $localize `Esto es un hobby, por lo que estudio solo los sabados en la mañana.`
        ),
        new Education(
            $localize `UANL - Facultad de Ciencias Físico-Matemáticas`, 
            $localize `Licenciado en Multimedia y Animación Digital`, 
            $localize `2018 - 2022`, 
            true,
            $localize `2024`,
            "Logo_UANL.png",
            $localize `A pesar del nombre de la carrera, el 80% de lo que nos enseñaron fue programación de todo tipo, aquí aprendí a hacer entornos gráficos, manejo óptimo de bases de datos, 
                diseño de aplicaciones móviles, creación de páginas web de todo tipo y sobre todo a ser autodidacta, una habilidad que me ha ayudado desde la carrera hasta en mi vida profesional.`
        )
    ]

    Experience = [
        new Experience(
            $localize `Ingeniero de Software I`,  
            $localize `Ellucian`, 
            $localize `2023 - 2026`, 
            $localize `Desarrollador web en .NET y Angular de plataforma internacional administrativa para universidades. Manejo de llamadas API óptimos con datos de alta densidad, sistema de búsqueda y 
                emparejamiento de posibles becas para estudiantes, implementación de páginas web de aviso financiero a estudiantes, personalizadas para cada universidad. `
        ),
        new Experience(
            $localize `Practicante para Programación Web`, 
            $localize `UANL - Facultad de Ciencias Físico-Matemáticas`, 
            $localize `2021 - 2022`, 
            $localize `Creación de página web expositora de proyectos de la licenciatura de multimedia y animación digital seleccionados de los alumnos y mantenimiento de página web de la Facultad de Ciencias Físico Matemáticas. Ambas usando Laravel y MySQL.`
        )
    ]

    Interests = [
        new Interest(
            $localize `Paleontología`,
            $localize `Me apasionan los fósiles, ya sea de dinosaurios, artrópodos, plantas o bacterias; lo encuentro todo muy fascinante. Incluso estoy estudiándola actualmente como hobby.`
        ), 
        new Interest(
            $localize `Videojuegos`,
            $localize `A sorpresa de nadie, soy fan de los videojuegos. Me gusta completarlos al 100%, como lo he hecho con Skyrim, Dark Souls, Subnautica, Mario Galaxy, entre otros; verdaderamente lo disfruto.`
        ),
        new Interest(
            $localize `Arte`,
            $localize `A veces dibujo ya sea sketches o dibujos completos y otras veces hago modelos 3D. Mayormente de fósiles reconstruidos o simplemente sketches de los fósiles preparados.`
        )
    ]

    changeLanguage(language: ELanguages){

        if(this.displayLanguage == language) return;
        
        this.displayLanguage = language;
        const currentPath = this.router.url; 

        if(language == this.lang.ES){
            window.location.href = `/es${currentPath}`;
        }
        else{
            window.location.href = `/en${currentPath}`;
        }

    }

    isButtonActive(button: ELanguages){
        return this.displayLanguage == button ? "active" : "";
    }

    KorokSerchToggle(){
        this.isKorokSearchActive = !this.isKorokSearchActive;
        if(this.isKorokSearchActive) {
            this.resetKorokSearch();
        }
    }    

    MobileMenuToggle(){
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        let mobileContentElement = this.menuContent.nativeElement;
        
        const sectionHeight = mobileContentElement.scrollHeight;
        
        if(this.isMobileMenuOpen){
            mobileContentElement.style.height = sectionHeight + 'px';

            mobileContentElement.addEventListener('transitionend', function clearHeight() {
   
                mobileContentElement.style.height = 'auto';
                mobileContentElement.removeEventListener('transitionend', clearHeight);

            }, { once: true });

        }
        else{
            this.CloseAllMobieMenu();
        }
    }

    CloseAllMobieMenu(){
        this.CloseMobileMenuElement(this.menuContent.nativeElement);
        
        this.CloseMobileMenuElement(this.goToContent.nativeElement);
        this.CloseMobileMenuElement(this.langContent.nativeElement);
        this.CloseMobileMenuElement(this.downloadContent.nativeElement);

        this.isGoToMenuOpen = false;
        this.isLanguageMenuOpen = false;
        this.isDownloadMenuOpen = false;
    }

    CloseMobileMenuElement(HTMLelement: any){
        const sectionHeight = HTMLelement.scrollHeight;
        HTMLelement.style.height = sectionHeight + 'px';
        HTMLelement.offsetHeight;
        HTMLelement.style.height = '0px';
    }

    MobileMenuContentToggle(HTMLelement: any, option: EMobileMenuOptions){
        
        let element = HTMLelement;
        let isContentOpen = false;

        switch(option){
            case this.options.GoTo:
            {
                this.isGoToMenuOpen = !this.isGoToMenuOpen;
                isContentOpen = this.isGoToMenuOpen;
                break;
            }
            case this.options.Language:
            {
                this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
                isContentOpen = this.isLanguageMenuOpen;
                break;
            }
            case this.options.Download:
            {
                this.isDownloadMenuOpen = !this.isDownloadMenuOpen;
                isContentOpen = this.isDownloadMenuOpen;
                break;
            }
                
        }

        const sectionHeight = element.scrollHeight;

        if(isContentOpen){
            element.style.height = sectionHeight + 'px';

            element.addEventListener('transitionend', function clearHeight() {
   
                element.style.height = 'auto';
                element.removeEventListener('transitionend', clearHeight);

            }, { once: true });

        }
        else{
            element.style.height = sectionHeight + 'px';
            element.offsetHeight;
            element.style.height = '0px';
        }
    }

    scrollToElement(element: any){
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        this.isMobileMenuOpen= false;
        this.CloseAllMobieMenu();
    }

}
