class CubeValidator{

    validation(cubeState,stage1Config,stage2Config,stage3Config){

        let currentRotation=""
        currentRotation = stage1Config.Complete(cubeState.slice())
        currentRotation += stage2Config.Complete(stage1Config.getEstado().slice())
        currentRotation += stage3Config.Complete(stage2Config.getEstado().slice())
        stage3Config.isSolved(stage3Config.getEstado().slice())

        return stage3Config.isSolved(stage3Config.getEstado().slice())
    }

    
}