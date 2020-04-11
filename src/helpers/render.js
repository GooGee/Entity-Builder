import nunjucks from 'nunjucks'

export default function render(project, entity, file) {
    const data = {
        project,
        entity,
        file,
        data: process(project, entity, file),
        model: entity.FileManager.findByLayer('Model'),
    }
    const template = project.TemplateManager.find(file.layer.template)
    const result = nunjucks.renderString(template.text, data)
    // console.log(result)
    return result
}

function process(project, entity, file) {
    const data = {}
    const script = project.ScriptManager.find(file.layer.script)
    const fff = new Function('return ' + script.text)()
    fff(project, entity, file, data)
    return data
}
