import { renderHook, act } from '@testing-library/react-hooks'
import {useToggle, useMovies} from './../hooks';



describe('useToggle hook',()=>{
    it('should change toggle status',()=>{
        const {result} = renderHook(()=>useToggle())
    
        expect(result.current.state).toBe(false)
    
        act(()=>result.current.toggle(1))
        
        expect(result.current.state).toBe(true)
    })
    it('should add element',()=>{
        const {result} = renderHook(()=>useToggle())
    
        expect(result.current.eventElement).toBe(null)
    
        act(()=>result.current.toggle({target:1}))
        
        expect(result.current.eventElement).toBe(1)
    })

})

describe('useMovies hook',()=>{
    const movieExample = {
        title:'Movie',
        id:1
    }

    it('should select movie element',()=>{
        const {result} = renderHook(()=>useMovies())

        expect(result.current.selectedMovies).toEqual([])
        act(()=>{
            result.current.selectMovie(movieExample)
        })
        expect(result.current.selectedMovies).toEqual([movieExample])
    })
    it('should delete movie element',()=>{
        const {result} = renderHook(()=>useMovies())

        act(()=>{result.current.selectMovie(movieExample)})

        expect(result.current.selectedMovies).toEqual([movieExample])

        act(()=>{
            result.current.deleteMovie(1)
        })
        expect(result.current.selectedMovies).toEqual([])
    })
    it('should not add movie if the same is selected',()=>{
        const {result} = renderHook(()=>useMovies())

        act(()=>{result.current.selectMovie(movieExample)})

        expect(result.current.selectedMovies).toEqual([movieExample])

        act(()=>{
            if(result.current.selectedMovies !== movieExample ) {
                result.current.selectMovie(movieExample)
            }
        })
        expect(result.current.selectedMovies).toEqual([movieExample])

        act(()=>{
            if(result.current.selectMovies !== {...movieExample,id:2} ) {
                result.current.selectMovie({...movieExample, id:2})
            }
        })
        expect(result.current.selectedMovies).toEqual([{...movieExample, id:2}, movieExample])

    })
})