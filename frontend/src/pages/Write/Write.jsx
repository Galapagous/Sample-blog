import { Label, Textarea, TextInput } from 'flowbite-react'
import React from 'react'

const Write = () => {
  return (
    <div>
        <h1>Make it inspiring</h1>
        <form action="">
            <div>
                <Label value='Title'/>
                <TextInput />
            </div>
            <div>
                <div className='w-full h-[300px]'>
                    <img src='' alt='post avatar'/>
                </div>
            </div>
            <div>
                <Label value='Post content'/>
                <Textarea/>
            </div>
        </form>
    </div>
  )
}

export default Write