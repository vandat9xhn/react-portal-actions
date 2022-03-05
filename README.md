# react-portal-actions

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-portal-actions.svg)](https://www.npmjs.com/package/react-portal-actions) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-portal-actions
```

## Usage

```tsx
import React, { useState } from 'react';
//
import { Actions, ActionsMultiList, ActionsHold } from 'react-portal-actions';
import 'react-portal-actions/dist/index.css';

//
const App = () => {
    //
    const [is_show, setIsShow] = useState(false);

    // ----

    //
    function handleClose() {
        setIsShow(false);
    }

    //
    function toggleShow() {
        setIsShow((is_show) => !is_show);
    }

    //
    function handleAction(action_name: string) {
        console.log(action_name);
    }

    //
    function handle_API_L() {
        const data = [
            [
                { name: 'action_1', title: 'Action 1', info: '' },
                { name: 'action_2', title: 'Action 2', info: 'Info 2' },
                { name: 'action_3', title: 'Action 3', info: '' }
            ]
        ];

        return new Promise<typeof data>((res) => {
            setTimeout(() => {
                res(data);
            }, 250);
        });
    }

    //
    return (
        <div>
            <div style={{ height: '400px' }}></div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '50px 20px'
                }}
            >
                <div>Click ... to show 'PortalAction'</div>

                <div>
                    {/* <Actions
                        is_show={is_show}
                        handleClose={handleClose}
                        toggleShow={toggleShow}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '250px',
                                height: '200px'
                            }}
                        >
                            <div
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                Portal Actions
                            </div>
                        </div>
                    </Actions> */}

                    <ActionsMultiList
                        handleClose={handleClose}
                        toggleShow={toggleShow}
                        handleAction={handleAction}
                        handle_API_L={handle_API_L}
                    />

                    <ActionsHold
                        title_action={
                            <div style={{ cursor: 'pointer' }}>Hover me!</div>
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '250px',
                                height: '200px'
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Actions Hold
                            </div>
                        </div>
                    </ActionsHold>
                </div>
            </div>

            <div style={{ height: '400px' }}></div>
        </div>
    );
};

export default App;
```

## License

MIT © [vandat9xhn](https://github.com/vandat9xhn)
