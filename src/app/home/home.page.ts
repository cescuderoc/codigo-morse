import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { GetCodigoMorseService } from '../services/get-codigo-morse.service';

declare var speechSynthesis: SpeechSynthesis;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController,  
    private speechRecognition: SpeechRecognition,
    private getCodigoMorseService: GetCodigoMorseService) {}

  textoToMorse:string = '';
  morseToTexto:string = '';

  readonly diccionarioMorse: Map<string, string> = new Map([
    ['a', '.-'],
    ['b', '-...'],
    ['c', '-.-.'],
    ['ch', '----'],
    ['d', '-..'],
    ['e', '.'],
    ['f', '..-.'],
    ['g', '--.'],
    ['h', '....'],
    ['i', '..'],
    ['j', '.---'],
    ['k', '-.-'],
    ['l', '.-..'],
    ['m', '--'],
    ['n', '-.'],
    ['ñ', '--.--'],
    ['o', '---'],
    ['p', '.--.'],
    ['q', '--.-'],
    ['r', '.-.'],
    ['s', '...'],
    ['t', '-'],
    ['u', '..-'],
    ['v', '...-'],
    ['w', '.--'],
    ['x', '-..-'],
    ['y', '-.--'],
    ['z', '--..'],
    ['0', '-----'],
    ['1', '.----'],
    ['2', '..---'],
    ['3', '...--'],
    ['4', '....-'],
    ['5', '.....'],
    ['6', '-....'],
    ['7', '--...'],
    ['8', '---..'],
    ['9', '----.'],
    ['.', '.-.-.-'],
    [',', '--..--'],
    ['?', '..--..'],
    ['"', '.-..-.'],
    ['/', '-..-.'],
    [' ', ' ']
  ]);
  
  readonly diccionarioTexto: Map<string, string> = new Map([
    ['.-', 'a'],
    ['-...', 'b'],
    ['-.-.', 'c'],
    [ '----', 'ch'],
    ['-..', 'd'],
    ['.', 'e'],
    ['..-.', 'f'],
    ['--.', 'g'],
    ['....', 'h'],
    ['..', 'i'],
    ['.---', 'j'],
    ['-.-', 'k'],
    ['.-..', 'l'],
    ['--', 'm'],
    ['-.', 'n'],
    ['--.--', 'ñ'],
    ['---', 'o'],
    ['.--.', 'p'],
    ['--.-', 'q'],
    ['.-.', 'r'],
    ['...', 's'],
    ['-', 't'],
    ['..-', 'u'],
    ['...-', 'v'],
    ['.--', 'w'],
    ['-..-', 'x'],
    ['-.--', 'y'],
    ['--..', 'z'],
    ['-----', '0'],
    ['.----', '1'],
    ['..---', '2'],
    ['...--', '3'],
    ['....-', '4'],
    ['.....', '5'],
    ['-....', '6'],
    ['--...', '7'],
    ['---..', '8'],
    ['----.', '9'],
    ['.-.-.-', '.'],
    ['--..--', ','],
    ['..--..', '?'],
    ['.-..-.', '"'],
    ['-..-.', '/'],
    [' ', ' ']
  ]);

  /**
   * Funcion encargada de convertir texto a codigo morse.
   * 
   */
  async toMorse(){

    let arregloTexto:string[] = [];
    let arregloMorse:string[] = [];
    let textoMorse:string = '';

    if(this.textoToMorse != null && this.textoToMorse != ""){
      arregloTexto = this.textoToMorse.split('');
    }
    
    for (let index = 0; index < arregloTexto.length; index++) {
      let valorMorse = this.diccionarioMorse.get(arregloTexto[index].toLowerCase());
      if(valorMorse != undefined){
        
        arregloMorse.push(valorMorse);
        if(arregloTexto[index] != " "){
          // arregloMorse.push('(' + arregloTexto[index] + ')');
        } else {
          arregloMorse.push(arregloTexto[index]);
        }
        
      } else {
        arregloMorse.push('?');
      }
    }

    // const alert = await this.alertController.create({
    //   header: 'Conversión exitosa!',
    //   message: 'Se tradujo: ' + this.textoToMorse,
    //   buttons: ['OK']
    // });
    // await alert.present();
    
    if(arregloMorse.length > 0){
      textoMorse = arregloMorse.join(" ");
    }
    this.morseToTexto = textoMorse;
    //Se toma el texto y se hace un arreglo
  }

  /**
   * Funcion encargada de reproducir el texto ingresado.
   * 
   */
  async listenTexto() {

    // this.tts.speak({text:this.textoToMorse});

    // this.speechRecognition.startListening().subscribe((matches: string[]) => {
    //   console.log(matches);
    // });


    this.speak(this.textoToMorse);

    //  TextToSpeech['speak']({ text: this.textoToMorse });

  

  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
  
  /**
   * Funcion encargada de convertir a texto codigo morse.
   * 
   */
  toTexto(){
    console.log("roger");
    let arregloTexto:string[] = [];
    let arregloMorse:string[] = [];
    let texto:string = '';

    if(this.morseToTexto != null && this.morseToTexto != ""){
      arregloMorse = this.morseToTexto.split(' ');
    }
    
    for (let index = 0; index < arregloMorse.length; index++) {
      let valorTexto = this.diccionarioTexto.get(arregloMorse[index]);
      if(valorTexto != undefined){
        
        arregloTexto.push(valorTexto);
        if(arregloMorse[index] != " "){
          arregloTexto.push('(' + arregloMorse[index] + ')');
        } else {
          arregloTexto.push(arregloMorse[index]);
        }
        
      } else {
        arregloTexto.push('?');
      }
    }

    // const alert = await this.alertController.create({
    //   header: 'Conversión exitosa!',
    //   message: 'Se tradujo: ' + this.textoToMorse,
    //   buttons: ['OK']
    // });
    // await alert.present();
    
    if(arregloTexto.length > 0){
      texto = arregloTexto.join("  ");
    }
    this.textoToMorse = texto;
    //Se toma el texto y se hace un arreglo


  }

  /**
   * Funcion encargada de reproducir el codigo morse ingresado.
   * 
   */
  listenMorse(){
    this.speak(this.morseToTexto);
  }


  data: any;
  textoAmorse(){
    if(this.textoToMorse != null && this.textoToMorse != ""){
      this.getCodigoMorseService.getData(this.textoToMorse).subscribe((response) => {
        this.data = response;
        this.morseToTexto = this.data;
      });
    }
    
  }

}
