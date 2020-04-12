import nunjucks from 'nunjucks'

nunjucks.configure({ autoescape: false })

export default function render(file, entity, project) {
    const data = {
        project,
        entity,
        file,
        data: process(file, entity, project),
        model: entity.FileManager.findByLayer('Model'),
    }
    const template = project.TemplateManager.find(file.layer.template)
    const result = nunjucks.renderString(template.text, data)
    // console.log(result)
    return result
}

function process(file, entity, project) {
    const data = {}
    const script = project.ScriptManager.find(file.layer.script)
    const fff = new Function('return ' + script.text)()
    fff(project, entity, file, data)
    return data
}
