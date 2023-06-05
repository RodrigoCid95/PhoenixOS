import { IKernel } from 'phoenix-builder'

export default class OS {
  constructor(private kernel: IKernel) {
    console.log(kernel)
  }
}