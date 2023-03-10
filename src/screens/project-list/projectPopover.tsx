import { Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import styled from '@emotion/styled'
import { LinkButton } from '../../components/common/lib'
import { useProjectModel, useProjects } from '../../shared/hooks/use-projects'

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const { open } = useProjectModel()
  const pinnedProjects = projects?.filter((item) => item.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏的项目</Typography.Text>
      <List>
        {pinnedProjects?.map((item) => {
          if (item.pin) {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.name}></List.Item.Meta>
              </List.Item>
            )
          }
        })}
      </List>
      <Divider></Divider>
      <LinkButton onClick={open}>创建项目</LinkButton>
    </ContentContainer>
  )
  return (
    <Popover content={content}>
      <h2>项目</h2>
    </Popover>
  )
}

const ContentContainer = styled('div')`
  width: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
