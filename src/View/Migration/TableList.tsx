import { readDBSchema } from "@/api"
import loadDBSchema from "@/Service/loadDBSchema"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"
import WaitingButton from "../Button/WaitingButton"

export default function TableList() {
    const sEntityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()

    const [all, setAll] = useState(false)
    const [schema, setSchema] = useState<LB.DoctrineSchema>()
    const [waiting, setWaiting] = useState(false)

    const nameSet = new Set(
        sEntityzzStore.itemzz.map((item) => (item.table ? item.table : item.name)),
    )

    function update(table: LB.DoctrineTable, included: boolean) {
        if (schema === undefined) {
            return
        }

        const tablezz = schema.tablezz.map((item) => {
            if (Object.is(item, table)) {
                return { ...item, included }
            }
            return item
        })
        setSchema({ ...schema, tablezz })
    }

    return (
        <table className="table">
            <caption>
                <WaitingButton
                    waiting={waiting}
                    onClick={function () {
                        if (waiting) {
                            return
                        }

                        setWaiting(true)
                        readDBSchema()
                            .then((response) => {
                                setWaiting(false)
                                response.data.data.tablezz.forEach(
                                    (item) => (item.included = false),
                                )
                                setSchema(response.data.data)
                            })
                            .catch((error) => {
                                setWaiting(false)
                                sToastzzStore.showError(error)
                            })
                    }}
                >
                    read DB tables
                </WaitingButton>
            </caption>
            <thead>
                <tr>
                    <td>selected</td>
                </tr>
            </thead>
            <tbody>
                {schema
                    ? schema.tablezz.map((item) => (
                          <tr key={item.name}>
                              <td>
                                  <div className="form-check form-switch">
                                      <input
                                          checked={item.included}
                                          onChange={(event) =>
                                              update(item, event.target.checked)
                                          }
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id={"nameSwitchCheck" + item.name}
                                      />
                                      <label
                                          className="form-check-label"
                                          htmlFor={"nameSwitchCheck" + item.name}
                                      >
                                          {item.name}
                                          {nameSet.has(item.name) ? (
                                              <span className="text-danger ms-1">
                                                  exists
                                              </span>
                                          ) : null}
                                      </label>
                                  </div>
                              </td>
                          </tr>
                      ))
                    : null}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <div className="form-check form-switch inline me-3">
                            <input
                                checked={all}
                                onChange={function (event) {
                                    setAll(event.target.checked)
                                    if (schema === undefined) {
                                        return
                                    }

                                    const tablezz = schema.tablezz.map((item) => ({
                                        ...item,
                                        included: event.target.checked,
                                    }))
                                    setSchema({ ...schema, tablezz })
                                }}
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="allSwitchCheck"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="allSwitchCheck"
                            >
                                all
                            </label>
                        </div>

                        <WaitingButton
                            waiting={waiting}
                            onClick={function () {
                                if (schema === undefined) {
                                    return
                                }
                                if (waiting) {
                                    return
                                }

                                setWaiting(true)
                                loadDBSchema(schema)
                                    .then((amount) => {
                                        setWaiting(false)
                                        sToastzzStore.showSuccess(
                                            `created ${amount} schemas`,
                                        )
                                    })
                                    .catch((error) => {
                                        setWaiting(false)
                                        sToastzzStore.showError(error)
                                    })
                            }}
                        >
                            import selected tables
                        </WaitingButton>
                    </td>
                </tr>
                <tr>
                    <td>
                        <ul>
                            <li>table names and column names are case sensitive.</li>
                            <li>cannot import existed tables.</li>
                            <li>
                                if related tables not exist when importing a table, it
                                will fail.
                            </li>
                            <li>
                                if a table and a schema with the same name, but have
                                different columns(foreign keys), it will fail.
                            </li>
                        </ul>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
