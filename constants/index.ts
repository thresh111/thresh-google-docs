export const templates = [
  {
    id: "blank",
    label: "Blank Template",
    imageUrl: "/blank-document.svg",
    content: "",
  },

  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    content: `
    <h1 style="text-align: center; margin-bottom: 0.5rem;">张三</h1>
    <p style="text-align: center; margin-bottom: 1rem; color: #666;">软件工程师 | zhang.san@email.com | 138-0000-0000 | 北京市</p>
    
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 0.5rem;">个人简介</h2>
    <p>具有5年软件开发经验的全栈工程师，擅长React、Node.js和云原生技术。热衷于构建高质量的用户体验和可扩展的系统架构。</p>
    
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 0.5rem;">工作经历</h2>
    <h3>高级软件工程师 | 科技有限公司 (2021-2024)</h3>
    <ul>
      <li>负责前端架构设计，使用React和TypeScript开发企业级应用</li>
      <li>优化系统性能，页面加载速度提升40%</li>
      <li>指导初级开发人员，建立代码审查和开发规范</li>
    </ul>
    
    <h3>软件工程师 | 互联网公司 (2019-2021)</h3>
    <ul>
      <li>开发微服务架构，使用Node.js和Docker容器化部署</li>
      <li>参与产品需求分析和技术选型</li>
      <li>维护CI/CD流程，确保代码质量和部署效率</li>
    </ul>
    
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 0.5rem;">教育背景</h2>
    <h3>计算机科学与技术 学士学位 | 清华大学 (2015-2019)</h3>
    <p>主修课程：数据结构、算法设计、数据库系统、软件工程</p>
    
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 0.5rem;">技能专长</h2>
    <ul>
      <li><strong>编程语言：</strong>JavaScript, TypeScript, Python, Java</li>
      <li><strong>前端框架：</strong>React, Vue.js, Next.js</li>
      <li><strong>后端技术：</strong>Node.js, Express, FastAPI</li>
      <li><strong>数据库：</strong>MySQL, PostgreSQL, MongoDB, Redis</li>
      <li><strong>云服务：</strong>AWS, 阿里云, Docker, Kubernetes</li>
    </ul>
    
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 0.5rem;">项目经验</h2>
    <h3>电商平台重构项目</h3>
    <p>使用微服务架构重构传统单体应用，提升系统可维护性和扩展性。采用React + Node.js技术栈，支持日均10万+用户访问。</p>
    
    <h3>实时协作文档系统</h3>
    <p>基于WebSocket和OT算法开发的多人实时协作文档编辑器，类似Google Docs的功能体验。</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    content: `
    <p style="text-align: right;">张三<br>北京市朝阳区xxx街道xxx号<br>电话：138-0000-0000<br>邮箱：zhang.san@email.com</p>
    
    <p style="margin-top: 2rem;">2024年12月16日</p>
    
    <p>尊敬的招聘经理：</p>
    
    <p>我写这封信是为了表达我对贵公司<strong>高级前端工程师</strong>职位的浓厚兴趣。作为一名拥有5年软件开发经验的工程师，我相信我的技能和经验能够为贵公司的技术团队带来价值。</p>
    
    <p>在我的职业生涯中，我专注于现代前端技术栈的开发，特别是：</p>
    <ul>
      <li>精通React、Vue.js等主流前端框架</li>
      <li>熟练使用TypeScript进行类型安全的开发</li>
      <li>具备丰富的响应式设计和移动端适配经验</li>
      <li>掌握现代化的前端工程化工具和流程</li>
    </ul>
    
    <p>在上一份工作中，我成功主导了公司核心产品的前端架构重构，采用微前端架构提升了开发效率，同时通过性能优化使页面加载速度提升了40%。我也积极参与代码审查和技术分享，帮助团队建立了更好的开发规范。</p>
    
    <p>我特别欣赏贵公司在技术创新方面的努力，以及对用户体验的重视。我相信我的技术能力和团队合作精神能够很好地融入贵公司的文化，为公司的发展贡献力量。</p>
    
    <p>期待有机会与您进一步讨论我如何能够为贵公司创造价值。感谢您抽出时间考虑我的申请。</p>
    
    <p style="margin-top: 2rem;">此致<br>敬礼</p>
    
    <p style="margin-top: 1rem;">张三</p>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    content: `
    <h1 style="text-align: center;">企业级文档协作平台开发提案</h1>
    <p style="text-align: center; color: #666;">提案日期：2024年12月16日</p>
    
    <h2>项目概述</h2>
    <p>本提案旨在为贵公司开发一套现代化的企业级文档协作平台，类似于Google Workspace的功能体验，支持多人实时协作编辑、版本控制、权限管理等核心功能。</p>
    
    <h2>项目目标</h2>
    <ul>
      <li>提供流畅的多人实时协作编辑体验</li>
      <li>支持丰富的文档格式和媒体内容</li>
      <li>建立完善的权限管理和安全机制</li>
      <li>实现高可用性和可扩展性的系统架构</li>
      <li>提供优秀的移动端体验</li>
    </ul>
    
    <h2>技术方案</h2>
    
    <h3>前端技术栈</h3>
    <ul>
      <li><strong>框架：</strong>Next.js + React 18</li>
      <li><strong>编辑器：</strong>TipTap（基于ProseMirror）</li>
      <li><strong>状态管理：</strong>Zustand + React Query</li>
      <li><strong>UI组件：</strong>Radix UI + Tailwind CSS</li>
      <li><strong>实时协作：</strong>Liveblocks</li>
    </ul>
    
    <h3>后端技术栈</h3>
    <ul>
      <li><strong>运行时：</strong>Node.js + Express</li>
      <li><strong>数据库：</strong>PostgreSQL + Redis</li>
      <li><strong>身份认证：</strong>JWT + OAuth 2.0</li>
      <li><strong>文件存储：</strong>AWS S3 / 阿里云OSS</li>
      <li><strong>消息队列：</strong>Redis + Bull Queue</li>
    </ul>
    
    <h3>基础设施</h3>
    <ul>
      <li><strong>容器化：</strong>Docker + Kubernetes</li>
      <li><strong>CI/CD：</strong>GitHub Actions</li>
      <li><strong>监控：</strong>Prometheus + Grafana</li>
      <li><strong>日志：</strong>ELK Stack</li>
    </ul>
    
    <h2>核心功能模块</h2>
    
    <h3>1. 富文本编辑器</h3>
    <ul>
      <li>支持标题、段落、列表、表格等基础格式</li>
      <li>图片、视频等媒体内容插入</li>
      <li>数学公式、代码块等专业内容</li>
      <li>评论和建议功能</li>
    </ul>
    
    <h3>2. 实时协作</h3>
    <ul>
      <li>多人同时编辑，实时同步</li>
      <li>光标位置和选择区域显示</li>
      <li>操作冲突解决（OT算法）</li>
      <li>在线用户状态显示</li>
    </ul>
    
    <h3>3. 文档管理</h3>
    <ul>
      <li>文档创建、删除、复制</li>
      <li>文件夹组织和分类</li>
      <li>搜索和筛选功能</li>
      <li>版本历史和恢复</li>
    </ul>
    
    <h3>4. 权限控制</h3>
    <ul>
      <li>用户角色管理（所有者、编辑者、查看者）</li>
      <li>文档分享链接生成</li>
      <li>组织架构和团队管理</li>
      <li>细粒度权限控制</li>
    </ul>
    
    <h2>项目时间表</h2>
    
    <table>
      <thead>
        <tr>
          <th>阶段</th>
          <th>时间周期</th>
          <th>主要交付物</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>需求分析和设计</td>
          <td>2周</td>
          <td>技术架构文档、UI/UX设计稿</td>
        </tr>
        <tr>
          <td>基础框架搭建</td>
          <td>3周</td>
          <td>项目脚手架、基础组件库</td>
        </tr>
        <tr>
          <td>编辑器开发</td>
          <td>4周</td>
          <td>富文本编辑器、基础功能</td>
        </tr>
        <tr>
          <td>协作功能</td>
          <td>3周</td>
          <td>实时协作、冲突解决</td>
        </tr>
        <tr>
          <td>文档管理</td>
          <td>3周</td>
          <td>文档CRUD、权限控制</td>
        </tr>
        <tr>
          <td>测试和优化</td>
          <td>2周</td>
          <td>性能优化、bug修复</td>
        </tr>
        <tr>
          <td>部署上线</td>
          <td>1周</td>
          <td>生产环境部署</td>
        </tr>
      </tbody>
    </table>
    
    <h2>预算估算</h2>
    <ul>
      <li><strong>开发人力成本：</strong>18周 × 3人 × 5000元/人周 = 270,000元</li>
      <li><strong>基础设施成本：</strong>云服务器、数据库、存储等 = 20,000元/年</li>
      <li><strong>第三方服务：</strong>Liveblocks、监控工具等 = 15,000元/年</li>
      <li><strong>总计：</strong>305,000元（首年）</li>
    </ul>
    
    <h2>风险评估</h2>
    <ul>
      <li><strong>技术风险：</strong>实时协作的复杂性，需要充分的技术验证</li>
      <li><strong>性能风险：</strong>大文档的编辑性能，需要优化策略</li>
      <li><strong>安全风险：</strong>文档数据的安全性，需要完善的安全措施</li>
      <li><strong>用户接受度：</strong>新系统的用户体验，需要充分的用户测试</li>
    </ul>
    
    <h2>后续维护</h2>
    <p>项目上线后，我们将提供：</p>
    <ul>
      <li>6个月的免费维护和bug修复</li>
      <li>功能迭代和性能优化建议</li>
      <li>技术培训和文档交付</li>
      <li>7×24小时技术支持</li>
    </ul>
    
    <h2>结语</h2>
    <p>我们相信这个文档协作平台将显著提升贵公司的工作效率和协作体验。我们拥有丰富的相关项目经验和技术实力，能够确保项目的成功交付。期待与您进一步讨论项目细节。</p>
    
    <p style="margin-top: 2rem;"><strong>联系方式：</strong><br>
    张三 - 项目经理<br>
    电话：138-0000-0000<br>
    邮箱：zhang.san@company.com</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    content: `
    <div style="text-align: right; margin-bottom: 2rem;">
      <strong>科技创新有限公司</strong><br>
      北京市海淀区中关村大街1号<br>
      电话：010-12345678<br>
      邮箱：contact@techcompany.com<br>
      网址：www.techcompany.com
    </div>
    
    <p>2024年12月16日</p>
    
    <div style="margin: 2rem 0;">
      <strong>收件人：</strong><br>
      王经理<br>
      ABC商务咨询有限公司<br>
      上海市浦东新区陆家嘴金融区999号<br>
      上海市 200120
    </div>
    
    <p><strong>主题：关于技术合作伙伴关系的提案</strong></p>
    
    <p>尊敬的王经理：</p>
    
    <p>我代表科技创新有限公司写这封信，希望与贵公司探讨建立长期技术合作伙伴关系的可能性。</p>
    
    <p>我们公司成立于2018年，专注于企业级软件解决方案的开发，在以下领域有着丰富的经验：</p>
    <ul>
      <li>企业级Web应用开发</li>
      <li>移动应用开发</li>
      <li>云原生解决方案</li>
      <li>数据分析和商业智能</li>
      <li>人工智能和机器学习应用</li>
    </ul>
    
    <p>我们了解到贵公司在商务咨询领域的专业地位，以及对数字化转型解决方案的需求。我们相信通过合作，能够为贵公司的客户提供更全面、更专业的技术服务。</p>
    
    <p>我们提议的合作模式包括：</p>
    <ol>
      <li><strong>技术支持服务：</strong>为贵公司的客户提供技术咨询和开发服务</li>
      <li><strong>联合解决方案：</strong>结合双方优势，开发行业特定的解决方案</li>
      <li><strong>人才交流：</strong>定期进行技术交流和培训</li>
      <li><strong>市场拓展：</strong>共同开拓新的市场机会</li>
    </ol>
    
    <p>为了进一步讨论合作细节，我建议我们安排一次会面。我们的团队可以在您方便的时间前往贵公司进行详细的方案演示和讨论。</p>
    
    <p>附件中包含了我们公司的详细介绍和成功案例，供您参考。如果您需要更多信息，请随时联系我。</p>
    
    <p>期待您的回复，也期待与贵公司建立互利共赢的合作关系。</p>
    
    <p style="margin-top: 2rem;">此致<br>商祺</p>
    
    <div style="margin-top: 2rem;">
      <strong>张三</strong><br>
      商务发展总监<br>
      科技创新有限公司<br>
      直线电话：010-12345678-801<br>
      手机：138-0000-0000<br>
      邮箱：zhang.san@techcompany.com
    </div>
    
    <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;">
    <strong>附件：</strong><br>
    1. 公司简介和资质证书<br>
    2. 技术服务案例集<br>
    3. 合作提案详细方案
    </p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    content: `
    <div style="text-align: right; margin-bottom: 2rem;">
      张三<br>
      北京市朝阳区望京街道123号<br>
      电话：138-0000-0000<br>
      邮箱：zhang.san@email.com
    </div>
    
    <p>2024年12月16日</p>
    
    <p>亲爱的李老师：</p>
    
    <p>您好！我是您2019届的学生张三，希望您还记得我。写这封信是想向您汇报一下我近期的工作和生活情况，也想对您当年的悉心教导表达我的感谢。</p>
    
    <p>自从大学毕业后，我一直在软件开发领域工作。目前在一家科技公司担任高级工程师，主要负责前端架构和团队管理工作。这几年的工作经历让我深深体会到，您当初在课堂上强调的<strong>"扎实的基础知识"</strong>和<strong>"持续学习的重要性"</strong>是多么正确。</p>
    
    <p>还记得您常说的话："技术会不断更新，但基础的计算机科学原理是不变的。"这句话一直指导着我的职业发展。无论是学习新的编程语言，还是面对复杂的系统设计问题，我都会回到基础原理去思考和解决。</p>
    
    <p>最近我在工作中遇到了一些挑战：</p>
    <ul>
      <li>如何在快速迭代的项目中保持代码质量</li>
      <li>如何平衡技术债务和新功能开发</li>
      <li>如何培养和指导团队中的年轻开发者</li>
    </ul>
    
    <p>在处理这些问题时，我经常想起您的教学方式 - 不只是传授知识，更重要的是培养我们独立思考和解决问题的能力。我现在也尝试将这种方式应用到团队管理中，希望能帮助年轻同事更好地成长。</p>
    
    <p>除了工作，我还保持着对新技术的学习热情。最近在关注人工智能在软件开发中的应用，也在考虑是否要继续深造，攻读硕士学位。如果您有任何建议，我非常希望能听到您的意见。</p>
    
    <p>听同学说您最近在研究新的教学方法，将更多实践项目融入到课程中。我觉得这个方向很好，理论结合实践确实能让学生更好地理解和掌握知识。如果您需要任何行业方面的信息或者希望我为学生们分享一些实际工作经验，我很乐意提供帮助。</p>
    
    <p>希望您身体健康，工作顺利。如果您有时间，我很希望能回学校看望您，也想了解一下现在学弟学妹们的学习情况。</p>
    
    <p style="margin-top: 2rem;">此致<br>敬礼</p>
    
    <p style="margin-top: 1rem;">您的学生<br>张三<br>2024年12月16日</p>
    
    <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;">
    <strong>附注：</strong>我将最近参与的一个开源项目链接发送到您的邮箱，希望您有空可以看看并给予指导。
    </p>
    `,
  },
];
