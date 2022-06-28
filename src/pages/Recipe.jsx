import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"

import React from 'react'

function Recipe() {

  let params = useParams()
  const [details, setDetails] = useState({})
  const [activeTab, setActiveTab] = useState("instructions")

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json()
    setDetails(detailData)
  }

  useEffect(() => {
    fetchDetails()
  }, [params.name])

  return (
  <DetailWrapper>
    <div>
      <h2>{details.title}</h2>
      <img src={details.image} alt="" />
    </div>
    <Info>
      <Button className ={activeTab === 'ingredients' ? 'active' : ''} onClick = {() => setActiveTab("ingredients")}>Instructions</Button>
      <Button className ={activeTab === 'instructions' ? 'active' : ''} onClick = {() => setActiveTab("instructions")}>Ingredients</Button>

      {activeTab === 'instructions' && (
        <Text>
          <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
          <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
      </Text>
      )}

      {activeTab === 'ingredients' && (
         <ListText>
         {details.extendedIngredients.map((ingredient) => 
             <li key = {ingredient.id}>{ingredient.original}</li>
         )}
       </ListText>
      )}  
    </Info>
  </DetailWrapper> 
  )
}

const DetailWrapper = styled.div`
    margin-top: 7rem;
    margin-bottom: 4rem;
    display: flex;
    img{
      border-radius: 5px;
      height: 18rem; 
      width: 28rem;
    }
    .active{
      background: linear-gradient(35deg, #494949, #313131);
      color: white;
    }
    h2{
      margin-bottom: 2rem;
    }
    li{
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
    ul{
      margin-top: 2rem;
    }
`


const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 1rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 2rem;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  p{
    font-size: 11px;
    font-weight: 600;
    font-color: black;
  }
`
const ListText = styled.ul`
  li{
    font-size: 11px;
    font-weight: 600;
    font-color: black;
  }
`

export default Recipe